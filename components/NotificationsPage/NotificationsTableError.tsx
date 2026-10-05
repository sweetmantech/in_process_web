import { MANAGE_CARD_CLASS } from "@/lib/utils/classNames";

interface NotificationsTableErrorProps {
  error: Error;
}

const NotificationsTableError = ({ error }: NotificationsTableErrorProps) => (
  <div className={`${MANAGE_CARD_CLASS} px-4 py-8 text-center md:px-6`}>
    <p className="text-sm text-red-dark">failed to load notifications: {error.message}</p>
  </div>
);

export default NotificationsTableError;
