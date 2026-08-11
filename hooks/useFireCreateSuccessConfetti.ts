import { useEffect, useRef } from "react";
import fireCollectConfetti from "@/lib/moment/fireCollectConfetti";

interface UseFireCreateSuccessConfettiParams {
  liveTokenId?: string;
  isLoading: boolean;
  momentMetadata: unknown | null;
}

/**
 * `/create/success`에서 collect success와 동일한 confetti를
 * moment metadata 로딩 완료 후 1회만 실행합니다.
 */
export default function useFireCreateSuccessConfetti({
  liveTokenId,
  isLoading,
  momentMetadata,
}: UseFireCreateSuccessConfettiParams) {
  const hasFiredRef = useRef(false);

  useEffect(() => {
    if (hasFiredRef.current) return;
    if (!liveTokenId) return;
    // Skeleton 구간(isLoading & metadata 없음)에서는 실행하지 않음.
    if (isLoading && !momentMetadata) return;
    if (!momentMetadata) return;

    hasFiredRef.current = true;
    fireCollectConfetti();
  }, [liveTokenId, isLoading, momentMetadata]);
}

