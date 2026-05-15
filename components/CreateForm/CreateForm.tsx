"use client";

import CreateButton from "./CreateButton";
import Prompt from "./Prompt";
import Advanced from "./Advanced";
import Preview from "./Preview";
import Collections from "@/components/Collections";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useCreateCollectionModalTriggerProvider } from "@/providers/CollectionCreateProvider/CreateCollectionModalTriggerProvider";

const CreateForm = () => {
  const { inputRef } = useMetadataFormProvider();
  const { openModal } = useCreateCollectionModalTriggerProvider();

  return (
    <div className="col-span-1 w-full md:pl-12">
      <div ref={inputRef} className="flex h-fit flex-col space-y-3 pb-4">
        <Collections onCreateNew={openModal} />
        <Prompt />
        <Advanced />
        <Preview />
        <CreateButton />
      </div>
    </div>
  );
};

export default CreateForm;
