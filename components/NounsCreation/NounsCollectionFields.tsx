"use client";

import { useEffect } from "react";
import Collections from "@/components/Collections";
import { useNounsProposalProvider } from "@/providers/NounsCreateProvider/NounsProposalProvider";
import { useCreateCollectionModalTriggerProvider } from "@/providers/CollectionCreateProvider/CreateCollectionModalTriggerProvider";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";
import { CollectionItem } from "@/types/collections";

const NounsCollectionFields = () => {
  const { form } = useNounsProposalProvider();
  const { setValue } = form;
  const { openModal } = useCreateCollectionModalTriggerProvider();
  const { selectedCollection } = useCollectionsProvider();

  useEffect(() => {
    if (selectedCollection) {
      setValue("contractAddress", selectedCollection);
    }
  }, [selectedCollection, setValue]);

  const handleSelect = (collection: CollectionItem) => {
    setValue("contractAddress", collection.address);
  };

  return <Collections onCreateNew={openModal} onSelect={handleSelect} />;
};

export default NounsCollectionFields;
