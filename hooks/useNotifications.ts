import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getNotifications } from "@/lib/notifications/getNotifications";
import { useUserProvider } from "@/providers/UserProvider";

export function useNotifications(page = 1, limit = 20, viewed?: boolean) {
  const { userId } = useUserProvider();
  const [currentPage, setCurrentPage] = useState(page);

  const query = useQuery({
    queryKey: ["notifications", currentPage, limit, userId, viewed],
    queryFn: async () => {
      return getNotifications(currentPage, limit, userId, viewed);
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    retry: (failureCount) => failureCount < 3,
  });

  return {
    ...query,
    setCurrentPage,
    currentPage,
  };
}
