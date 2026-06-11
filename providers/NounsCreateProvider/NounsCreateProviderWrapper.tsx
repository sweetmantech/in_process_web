"use client";

import React from "react";
import { MetadataFormProvider } from "../MetadataFormProvider";
import { MetadataUploadProvider } from "../MetadataUploadProvider";
import { MomentCreateProvider } from "../MomentCreateProvider/MomentCreateProvider";
import { BulkCreateProvider } from "../BulkCreateProvider";
import { NounsProposalProvider } from "./NounsProposalProvider";

const NounsCreateProviderWrapper = ({ children }: { children: React.ReactNode }) => (
  <MetadataFormProvider>
    <MetadataUploadProvider>
      <MomentCreateProvider>
        <BulkCreateProvider>
          <NounsProposalProvider>{children}</NounsProposalProvider>
        </BulkCreateProvider>
      </MomentCreateProvider>
    </MetadataUploadProvider>
  </MetadataFormProvider>
);

export default NounsCreateProviderWrapper;
