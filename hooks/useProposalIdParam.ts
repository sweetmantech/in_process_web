import { useSearchParams } from "next/navigation";

const useProposalIdParam = () => {
  const searchParams = useSearchParams();
  return searchParams.get("proposalId");
};

export default useProposalIdParam;
