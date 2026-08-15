import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";
import { useMomentProvider } from "@/providers/MomentProvider";
import { setSale } from "@/lib/moment/setSale";
import saleStartToDate from "@/lib/moment/saleStartToDate";
import { isPermissionError } from "@/lib/errors/isPermissionError";

const useSetTimelineVisibility = () => {
  const { moment, saleConfig } = useMomentProvider();
  const { getAccessToken } = usePrivy();
  const [timelineAt, setTimelineAt] = useState<Date>(new Date());
  const [currentSaleStart, setCurrentSaleStart] = useState<number | undefined>();
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  useEffect(() => {
    if (!saleConfig) return;
    setTimelineAt(saleStartToDate(saleConfig.saleStart));
    setCurrentSaleStart(saleConfig.saleStart);
  }, [saleConfig]);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) throw new Error("Authentication required");
      const saleStart = Math.floor(timelineAt.getTime() / 1000);
      await setSale(accessToken, moment, saleStart);
      return saleStart;
    },
    onSuccess: (saleStart) => {
      setCurrentSaleStart(saleStart);
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
    currentSaleStart,
    hasSaleConfig: Boolean(saleConfig),
    save: () => mutate(),
    isLoading: isPending,
    showPermissionModal,
    closePermissionModal: () => setShowPermissionModal(false),
  };
};

export default useSetTimelineVisibility;
