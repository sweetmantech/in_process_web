import { useHasMounted } from "@/hooks/useHasMounted";

export const useLocalDateTime = (value: string): string | null => {
  const mounted = useHasMounted();
  return mounted ? new Date(value).toLocaleString("en-US") : null;
};
