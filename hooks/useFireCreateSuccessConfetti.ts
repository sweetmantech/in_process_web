import { useEffect, useRef } from "react";
import fireCollectConfetti from "@/lib/moment/fireCollectConfetti";

interface UseFireCreateSuccessConfettiParams {
  liveTokenId?: string;
  isLoading: boolean;
  momentMetadata: unknown | null;
}

export default function useFireCreateSuccessConfetti({
  liveTokenId,
  isLoading,
  momentMetadata,
}: UseFireCreateSuccessConfettiParams) {
  const hasFiredRef = useRef(false);

  useEffect(() => {
    if (hasFiredRef.current) return;
    if (!liveTokenId) return;
    if (isLoading && !momentMetadata) return;
    if (!momentMetadata) return;

    hasFiredRef.current = true;
    fireCollectConfetti();
  }, [liveTokenId, isLoading, momentMetadata]);
}
