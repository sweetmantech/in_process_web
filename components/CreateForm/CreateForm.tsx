"use client";

import Prompt from "./Prompt";
import Advanced from "./Advanced";
import Preview from "./Preview";
import Price from "./Price";
import Description from "./Description";
import Collections from "@/components/Collections";
import { useCreateCollectionModalTriggerProvider } from "@/providers/CollectionCreateProvider/CreateCollectionModalTriggerProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";
import useTypeParam from "@/hooks/useTypeParam";
import { cn } from "@/lib/utils";

const CreateForm = () => {
  const { openModal } = useCreateCollectionModalTriggerProvider();
  const type = useTypeParam();
  const { isBulkMode } = useBulkCreateProvider();
  const { imageFile, animationFile } = useMetadataFormProvider();

  // Mobile design hides details until moment media is selected; always show for other types / desktop.
  const showDetailsOnMobile = isBulkMode || Boolean(type) || Boolean(imageFile || animationFile);

  return (
    <div
      className={cn(
        "col-span-1 w-full rounded-lg bg-white px-3 py-5 md:rounded-none md:bg-transparent md:px-0 md:py-0 md:pl-0",
        !showDetailsOnMobile && "hidden md:block"
      )}
    >
      <div className="flex h-fit flex-col gap-[18px] pb-4 md:min-h-full md:gap-6 md:pb-0">
        <Preview />
        <Collections onCreateNew={openModal} />
        <Prompt />
        <Price />
        <Description />
        <Advanced />
      </div>
    </div>
  );
};

export default CreateForm;
