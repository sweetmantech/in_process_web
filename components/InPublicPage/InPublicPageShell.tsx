"use client";

import { IN_PUBLIC_1155, IN_PUBLIC_CHAIN_ID } from "@/lib/inpublic/constants";
import { CollectionProvider } from "@/providers/CollectionProvider";
import { TimelineProvider } from "@/providers/TimelineProvider";
import InPublicPage from "@/components/InPublicPage/InPublicPage";
import { Address } from "viem";

const IN_PUBLIC_PAGE_LIMIT = 100;

const InPublicPageShell = () => {
  return (
    <CollectionProvider
      collection={{ address: IN_PUBLIC_1155 as Address, chainId: IN_PUBLIC_CHAIN_ID }}
    >
      <TimelineProvider
        collection={IN_PUBLIC_1155}
        chainId={IN_PUBLIC_CHAIN_ID}
        curated={false}
        limit={IN_PUBLIC_PAGE_LIMIT}
        sortOrder="token_id_asc"
      >
        <InPublicPage />
      </TimelineProvider>
    </CollectionProvider>
  );
};

export default InPublicPageShell;
