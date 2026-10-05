import { MANAGE_CARD_CLASS } from "@/lib/utils/classNames";

const NoNotificationsFound = () => (
  <div className={`${MANAGE_CARD_CLASS} px-4 py-8 text-center md:px-6`}>
    <p className="text-sm text-grey-moss-300">no notifications found</p>
  </div>
);

export default NoNotificationsFound;
