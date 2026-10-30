import useIsMobile from "@/hooks/useIsMobile";
import { useHasMounted } from "@/hooks/useHasMounted";
import { Viewport } from "@/types/viewport";

const useViewport = (): Viewport => {
  const isMobile = useIsMobile();
  const mounted = useHasMounted();

  if (!mounted) return undefined;
  return isMobile ? "mobile" : "desktop";
};

export default useViewport;
