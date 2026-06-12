"use client";

import React from "react";
import { MetadataFormProvider } from "../MetadataFormProvider";
import { MetadataUploadProvider } from "../MetadataUploadProvider";
import { MomentCreateProvider } from "./MomentCreateProvider";
import { BulkCreateProvider } from "../BulkCreateProvider";

interface MomentCreateProviderWrapperProps {
  children: React.ReactNode;
}

const MomentCreateProviderWrapper = ({ children }: MomentCreateProviderWrapperProps) => {
  return (
    <MetadataFormProvider>
      <MetadataUploadProvider>
        <MomentCreateProvider>
          <BulkCreateProvider>{children}</BulkCreateProvider>
        </MomentCreateProvider>
      </MetadataUploadProvider>
    </MetadataFormProvider>
  );
};

export default MomentCreateProviderWrapper;
