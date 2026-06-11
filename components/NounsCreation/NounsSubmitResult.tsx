"use client";

import { Button } from "@/components/ui/button";
import { useNounsProposalProvider } from "@/providers/NounsCreateProvider/NounsProposalProvider";
import useNounsSubmitProposal from "@/hooks/useNounsSubmitProposal";

const NounsSubmitResult = () => {
  const { result, reset, form } = useNounsProposalProvider();
  const { submit, submitting, txHash, votingPower, checkingVotingPower } = useNounsSubmitProposal();

  if (!result) return null;

  const { transaction, proposalThreshold } = result;
  const proposalTitle = form.getValues("proposalTitle");
  const proposalDescription = form.getValues("proposalDescription");

  const isEligible = votingPower !== undefined && votingPower >= proposalThreshold;

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    import("sonner").then(({ toast }) => toast.success(`${label} copied`));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-sm border border-grey p-4">
        {checkingVotingPower ? (
          <p className="font-spectral text-sm text-grey-moss-400">Checking voting power...</p>
        ) : isEligible ? (
          <p className="font-spectral text-sm text-grey-moss-900">
            ✓ You have <span className="font-semibold">{votingPower}</span> Noun
            {votingPower !== 1 ? "s" : ""} — eligible to submit.
          </p>
        ) : (
          <p className="font-spectral text-sm text-red-500">
            You need at least <span className="font-semibold">{proposalThreshold}</span> Noun
            {proposalThreshold !== 1 ? "s" : ""} to submit this proposal. You currently have{" "}
            <span className="font-semibold">{votingPower ?? 0}</span>.
          </p>
        )}
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <p className="font-archivo font-medium">governor contract</p>
          <button
            onClick={() => copy(transaction.to, "Address")}
            className="font-spectral text-xs text-grey-moss-400 underline hover:text-grey-moss-900"
          >
            copy
          </button>
        </div>
        <p className="break-all rounded-sm border border-grey bg-white px-3 py-2 font-spectral text-sm">
          {transaction.to}
        </p>
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <p className="font-archivo font-medium">calldata</p>
          <button
            onClick={() => copy(transaction.data, "Calldata")}
            className="font-spectral text-xs text-grey-moss-400 underline hover:text-grey-moss-900"
          >
            copy
          </button>
        </div>
        <p className="max-h-40 overflow-y-auto break-all rounded-sm border border-grey bg-white px-3 py-2 font-spectral text-xs">
          {transaction.data}
        </p>
      </div>

      <div>
        <p className="mb-1 font-archivo font-medium">value</p>
        <p className="font-spectral text-sm">{transaction.value} ETH</p>
      </div>

      {txHash ? (
        <div className="rounded-sm border border-grey bg-white px-3 py-2">
          <p className="font-archivo text-sm font-medium">proposal submitted</p>
          <p className="break-all font-spectral text-xs text-grey-moss-400">{txHash}</p>
        </div>
      ) : isEligible ? (
        <Button
          onClick={() => submit(result, proposalTitle, proposalDescription)}
          disabled={submitting}
          className="disabled:opacity-1 z-10 w-fit transform self-center !rounded-sm bg-black px-14 py-5 !font-archivo !text-xl text-grey-eggshell transition-transform duration-150 hover:bg-grey-moss-300 disabled:!pointer-events-auto disabled:!cursor-not-allowed md:!mt-4 md:h-[60px] md:w-full md:py-6"
        >
          {submitting ? "submitting..." : "submit proposal"}
        </Button>
      ) : null}

      <Button
        onClick={reset}
        variant="outline"
        className="w-fit self-center rounded-sm border-grey font-archivo text-grey-moss-400 hover:border-grey-moss-300"
      >
        build another
      </Button>
    </div>
  );
};

export default NounsSubmitResult;
