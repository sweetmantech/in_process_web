"use client";

import useNounsProposal from "@/hooks/useNounsProposal";
import NounsForm from "./NounsForm";
import NounsResult from "./NounsResult";

const NounsProposal = () => {
  const { form, submit, submitting, result, reset } = useNounsProposal();

  return (
    <div className="col-span-1 w-full md:col-span-2">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-archivo text-2xl font-medium">nouns proposal</h1>
          <p className="mt-1 font-spectral text-sm text-grey-moss-400">
            Build a Nouns governance proposal to mint a moment onchain.
          </p>
        </div>

        {result ? (
          <NounsResult result={result} onReset={reset} />
        ) : (
          <NounsForm form={form} onSubmit={submit} submitting={submitting} />
        )}
      </div>
    </div>
  );
};

export default NounsProposal;
