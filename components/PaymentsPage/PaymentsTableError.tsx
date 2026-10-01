interface PaymentsTableErrorProps {
  error: Error;
}

const PaymentsTableError = ({ error }: PaymentsTableErrorProps) => (
  <div className="mt-[50px] rounded-[14px] border border-[#E4E0D7] bg-white/60 py-8 text-center">
    <p className="text-sm text-red-600">failed to load payments: {error.message}</p>
  </div>
);

export default PaymentsTableError;
