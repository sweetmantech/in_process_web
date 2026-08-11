"use client";

import CreateButton from "./CreateButton";
import Prompt from "./Prompt";
import Advanced from "./Advanced";
import Preview from "./Preview";
import Price from "./Price";
import Description from "./Description";
import Collections from "@/components/Collections";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useCreateCollectionModalTriggerProvider } from "@/providers/CollectionCreateProvider/CreateCollectionModalTriggerProvider";

const CreateForm = () => {
  const { inputRef } = useMetadataFormProvider();
  const { openModal } = useCreateCollectionModalTriggerProvider();

  return (
    <div className="col-span-1 w-full md:pl-0">
      <div ref={inputRef} className="flex h-fit flex-col gap-6 pb-4 md:min-h-full md:gap-6 md:pb-0">
        <Preview />
        <Collections onCreateNew={openModal} />
        <Prompt />
        <Price />
        <Description />
        <Advanced />
        <div className="md:hidden">
          <CreateButton />
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
