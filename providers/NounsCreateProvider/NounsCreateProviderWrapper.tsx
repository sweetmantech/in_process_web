"use client";

import React from "react";
import { MetadataFormProvider } from "../MetadataFormProvider";
import { MetadataUploadProvider } from "../MetadataUploadProvider";
import { MomentCreateProvider } from "../MomentCreateProvider/MomentCreateProvider";
import { NounsProposalProvider } from "./NounsProposalProvider";

const NounsCreateProviderWrapper = ({ children }: { children: React.ReactNode }) => (
  <MetadataFormProvider>
    <MetadataUploadProvider>
      <MomentCreateProvider>
        <NounsProposalProvider>{children}</NounsProposalProvider>
      </MomentCreateProvider>
    </MetadataUploadProvider>
  </MetadataFormProvider>
);

export default NounsCreateProviderWrapper;
