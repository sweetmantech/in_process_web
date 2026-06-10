"use client";

import { Button } from "@/components/ui/button";
import { CreateNounsProposalResult } from "@/types/nouns";

interface NounsResultProps {
  result: CreateNounsProposalResult;
  onReset: () => void;
}

const NounsResult = ({ result, onReset }: NounsResultProps) => {
  const { transaction, proposalThreshold } = result;

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    import("sonner").then(({ toast }) => toast.success(`${label} copied`));
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-1 font-archivo font-medium">proposal threshold</p>
        <p className="font-spectral text-sm text-grey-moss-400">
          You need at least <span className="font-semibold text-grey-moss-900">{proposalThreshold}</span> Noun
          {proposalThreshold !== 1 ? "s" : ""} to submit this proposal.
        </p>
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

      <Button
        onClick={onReset}
        className="w-fit self-center rounded-sm bg-black px-10 py-5 font-archivo text-grey-eggshell hover:bg-grey-moss-300"
      >
        build another
      </Button>
    </div>
  );
};

export default NounsResult;
