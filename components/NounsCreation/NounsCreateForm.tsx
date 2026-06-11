"use client";

import Prompt from "@/components/CreateForm/Prompt";
import Advanced from "@/components/CreateForm/Advanced";
import FormPreview from "@/components/CreateForm/Preview";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import ProposalTitle from "./ProposalTitle";
import ProposalDescription from "./ProposalDescription";
import NounsCreateButton from "./NounsCreateButton";

const NounsCreateForm = () => {
  const { inputRef } = useMetadataFormProvider();

  return (
    <div className="col-span-1 w-full md:pl-12">
      <div ref={inputRef} className="flex h-fit flex-col space-y-3 pb-4">
        <ProposalTitle />
        <ProposalDescription />
        <Prompt />
        <Advanced />
        <FormPreview />
        <NounsCreateButton />
      </div>
    </div>
  );
};

export default NounsCreateForm;
