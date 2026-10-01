import { MANAGE_CARD_CLASS } from "@/lib/utils/classNames";

interface PaymentsTableErrorProps {
  error: Error;
}

const PaymentsTableError = ({ error }: PaymentsTableErrorProps) => (
  <div className={`${MANAGE_CARD_CLASS} px-4 py-8 text-center md:px-6`}>
    <p className="text-sm text-red-dark">failed to load payments: {error.message}</p>
  </div>
);

export default PaymentsTableError;
