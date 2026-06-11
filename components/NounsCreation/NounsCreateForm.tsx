"use client";

import Prompt from "@/components/CreateForm/Prompt";
import Advanced from "@/components/CreateForm/Advanced";
import FormPreview from "@/components/CreateForm/Preview";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useNounsProposalProvider } from "@/providers/NounsCreateProvider/NounsProposalProvider";
import NounsCollectionFields from "./NounsCollectionFields";
import ProposalTitle from "./ProposalTitle";
import ProposalDescription from "./ProposalDescription";
import NounsCreateButton from "./NounsCreateButton";
import NounsSubmitResult from "./NounsSubmitResult";

const NounsCreateForm = () => {
  const { inputRef } = useMetadataFormProvider();
  const { result } = useNounsProposalProvider();

  if (result) {
    return (
      <div className="col-span-1 w-full md:pl-12">
        <NounsSubmitResult />
      </div>
    );
  }

  return (
    <div className="col-span-1 w-full md:pl-12">
      <div ref={inputRef} className="flex h-fit flex-col space-y-3 pb-4">
        <NounsCollectionFields />
        <Prompt />
        <Advanced />
        <FormPreview />
        <ProposalTitle />
        <ProposalDescription />
        <NounsCreateButton />
      </div>
    </div>
  );
};

export default NounsCreateForm;
