import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";
import { useMomentProvider } from "@/providers/MomentProvider";
import { setSale } from "@/lib/moment/setSale";
import { isPermissionError } from "@/lib/errors/isPermissionError";

const saleStartToDate = (saleStart: number | string) =>
  BigInt(saleStart) === BigInt(0)
    ? new Date()
    : new Date(parseInt(saleStart.toString(), 10) * 1000);

const useSetTimelineVisibility = () => {
  const { moment, saleConfig, fetchMomentData } = useMomentProvider();
  const { getAccessToken } = usePrivy();
  const [timelineAt, setTimelineAt] = useState<Date>(new Date());
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  useEffect(() => {
    if (!saleConfig) return;
    setTimelineAt(saleStartToDate(saleConfig.saleStart));
  }, [saleConfig]);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) throw new Error("Authentication required");
      return setSale(accessToken, moment, Math.floor(timelineAt.getTime() / 1000));
    },
    onSuccess: async () => {
      await fetchMomentData();
      toast.success("Timeline visibility updated");
    },
    onError: (error: Error) => {
      if (isPermissionError(error)) {
        setShowPermissionModal(true);
      } else {
        toast.error(error.message || "Failed to update timeline visibility");
      }
    },
  });

  return {
    timelineAt,
    setTimelineAt,
    currentSaleStart: saleConfig?.saleStart,
    hasSaleConfig: Boolean(saleConfig),
    save: () => mutate(),
    isLoading: isPending,
    showPermissionModal,
    closePermissionModal: () => setShowPermissionModal(false),
  };
};

export default useSetTimelineVisibility;
