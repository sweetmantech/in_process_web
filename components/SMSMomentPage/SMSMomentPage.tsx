"use client";

import SMSMoment from "./SMSMoment";
import { MomentProvider } from "@/providers/MomentProvider";
import { CollectionProvider } from "@/providers/CollectionProvider";
import { useParams } from "next/navigation";
import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";
import { Address } from "viem";
import { MetadataFormProvider } from "@/providers/MetadataFormProvider";
import { MetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import { MomentUriUpdateProvider } from "@/providers/MomentUriUpdateProvider";
import { CollectionsProvider } from "@/providers/CollectionsProvider";

const SMSMomentPage = () => {
  const params = useParams();
  const collectionAddress = params.collection as string;
  const tokenId = params.tokenId as string;

  const { chainId, address } = parseCollectionAddress(collectionAddress);

  if (!address || !chainId) {
    return null;
  }

  return (
    <CollectionProvider
      collection={{
        address: address as Address,
        chainId,
      }}
    >
      <CollectionsProvider>
        <MetadataFormProvider>
          <MetadataUploadProvider>
            <MomentProvider
              moment={{
                collectionAddress: address as Address,
                tokenId,
                chainId,
              }}
            >
              <MomentUriUpdateProvider>
                <SMSMoment />
              </MomentUriUpdateProvider>
            </MomentProvider>
          </MetadataUploadProvider>
        </MetadataFormProvider>
      </CollectionsProvider>
    </CollectionProvider>
  );
};

export default SMSMomentPage;
