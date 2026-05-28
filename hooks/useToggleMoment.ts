import { useState, useEffect } from "react";
import { type TimelineMoment } from "@/types/moment";
import { toggleMoment } from "@/lib/timeline/toggleMoment";
import { toast } from "sonner";
import { Address } from "viem";
import { useQueryClient } from "@tanstack/react-query";
import { useMomentAdminHidden } from "./useMomentAdminHidden";
import { useAuthorizationProvider } from "@/providers/AuthorizationProvider";

export const useToggleMoment = (moment: TimelineMoment) => {
  const hidden = useMomentAdminHidden(moment);
  const [isHidden, setIsHidden] = useState(false);
  const { authorization } = useAuthorizationProvider();
  const queryClient = useQueryClient();

  // Sync local state when hidden value changes
  useEffect(() => {
    setIsHidden(hidden);
  }, [hidden]);

  const toggle = async (): Promise<void> => {
    try {
      const response = await toggleMoment(authorization, {
        collectionAddress: moment.address as Address,
        tokenId: moment.token_id,
        chainId: moment.chain_id,
      });

      if (response.success) {
        const newHidden = !isHidden;
        setIsHidden(newHidden);
        toast(newHidden ? "Moment hidden" : "Moment revealed");
      }
      await queryClient.invalidateQueries({ queryKey: ["timeline"] });
    } catch (error) {
      console.error("Failed to toggle moment visibility:", error);
      toast("Failed to toggle moment visibility");
    }
  };

  return { isHidden, toggle };
};
