"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useNounsProposalProvider } from "@/providers/NounsCreateProvider/NounsProposalProvider";
import useProposalIdParam from "@/hooks/useProposalIdParam";
import MetadataCreation from "@/components/MetadataCreation/MetadataCreation";
import Preview from "@/components/MetadataCreation/Preview";
import NounsCreatedHeader from "./NounsCreatedHeader";

const NounsSuccess = () => {
  const proposalId = useProposalIdParam();
  const { push } = useRouter();
  const { name } = useMetadataFormProvider();
  const { form } = useNounsProposalProvider();
  const proposalTitle = form.getValues("proposalTitle");
  const proposalDescription = form.getValues("proposalDescription");

  useEffect(() => {
    if (!proposalId) {
      push("/nouns");
    }
  }, [proposalId, push]);

  if (!proposalId) return null;

  return (
    <>
      <div className="col-span-1 h-fit">
        <NounsCreatedHeader />
      </div>
      <Preview>
        <MetadataCreation />
      </Preview>
      <div className="col-span-1 flex w-full flex-col gap-2 md:pl-12">
        <p className="text-center font-archivo-medium text-2xl md:text-left md:text-4xl">
          {proposalTitle || name}
        </p>
        {proposalDescription ? (
          <p className="whitespace-pre-wrap text-center font-spectral text-sm text-grey-moss-400 md:text-left">
            {proposalDescription}
          </p>
        ) : null}
        <p className="!m-0 text-center font-archivo md:text-left">proposal #{proposalId}</p>
        <p className="!m-0 text-center font-archivo md:text-left">{new Date().toLocaleString()}</p>
      </div>
    </>
  );
};

export default NounsSuccess;
