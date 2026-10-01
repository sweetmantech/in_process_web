import { MANAGE_CARD_CLASS } from "@/lib/utils/classNames";

const NoPaymentsFound = () => (
  <div className={`${MANAGE_CARD_CLASS} px-4 py-8 text-center md:px-6`}>
    <p className="text-sm text-grey-moss-300">no payments found</p>
  </div>
);

export default NoPaymentsFound;
