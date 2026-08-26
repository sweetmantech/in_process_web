"use client";

import { useEffect } from "react";
import MetadataCreationLayout from "@/components/MetadataCreation/Layout";
import MetadataCreation from "@/components/MetadataCreation";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";

const Create = () => {
  const { resetForm } = useMetadataFormProvider();
  const { clearAll } = useBulkCreateProvider();
  const { setCreatedTokenId } = useMomentCreateProvider();

  // Provider spans /create + /create/success; clear leftovers when re-entering create
  useEffect(() => {
    resetForm();
    clearAll();
    setCreatedTokenId("");
  }, [resetForm, clearAll, setCreatedTokenId]);

  return (
    <MetadataCreationLayout>
      <MetadataCreation />
    </MetadataCreationLayout>
  );
};

export default Create;
