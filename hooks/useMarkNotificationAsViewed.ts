import { useEffect } from "react";
import { markNotificationsAsViewed } from "@/lib/notifications/markNotificationsAsViewed";
import { useUserProvider } from "@/providers/UserProvider";

const useMarkNotificationAsViewed = () => {
  const { userId } = useUserProvider();

  useEffect(() => {
    if (!userId) return;
    const timer = setTimeout(() => {
      markNotificationsAsViewed(userId).catch((error) => {
        console.error("Failed to mark notifications as viewed:", error);
      });
    }, 10000);
    return () => clearTimeout(timer);
  }, [userId]);
};

export default useMarkNotificationAsViewed;
