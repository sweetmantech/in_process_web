import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { setDefaultCollection } from "@/lib/collections/setDefaultCollection";
import { useAuthorizationProvider } from "@/providers/AuthorizationProvider";
import { useWalletsProvider } from "@/providers/WalletsProvider";

export function useSetDefaultCollection() {
  const { primaryWallet } = useWalletsProvider();
  const { getAuthHeaders } = useAuthorizationProvider();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (collectionAddress: string | null) =>
      setDefaultCollection(collectionAddress, await getAuthHeaders()),
    onSuccess: (collection) => {
      queryClient.setQueryData(["default-collection", primaryWallet], collection);
      void queryClient.invalidateQueries({ queryKey: ["collections", primaryWallet] });
      toast.success("default collection updated");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to set default collection");
    },
  });

  return { setDefault: mutate, isPending };
}
