"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { useMetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import { createNounsProposalApi } from "@/lib/nouns/createNounsProposalApi";
import { REFERRAL_RECIPIENT } from "@/lib/consts";
import { NOUNS_CHAIN_ID } from "@/lib/nouns/consts";
import { CreateNounsProposalResult, NounsSalesConfig } from "@/types/nouns";
import { Address } from "viem";

export interface NounsCreateFormValues {
  proposalTitle: string;
  proposalDescription: string;
  contractType: "existing" | "new";
  contractAddress: string;
  collectionName: string;
  collectionUri: string;
}

const DEFAULT_SALES_CONFIG: NounsSalesConfig = {
  type: "ZoraTimedSaleStrategy",
  pricePerToken: "0",
  saleStart: "0",
  saleEnd: "18446744073709551615",
};

export default function useNounsCreate() {
  const { primaryWallet } = useWalletsProvider();
  const { generateMetadataUri } = useMetadataUploadProvider();
  const [building, setBuilding] = useState(false);
  const [result, setResult] = useState<CreateNounsProposalResult | null>(null);

  const form = useForm<NounsCreateFormValues>({
    defaultValues: {
      proposalTitle: "",
      proposalDescription: "",
      contractType: "new",
      contractAddress: "",
      collectionName: "",
      collectionUri: "",
    },
  });

  const build = async (values: NounsCreateFormValues) => {
    if (!primaryWallet) {
      toast.error("Wallet not connected");
      return;
    }

    try {
      setBuilding(true);

      const tokenMetadataURI = await generateMetadataUri();
      if (!tokenMetadataURI) throw new Error("Failed to upload media");

      const contract =
        values.contractType === "existing"
          ? { address: values.contractAddress }
          : { name: values.collectionName, uri: values.collectionUri };

      const data = await createNounsProposalApi({
        chainId: NOUNS_CHAIN_ID,
        account: primaryWallet as Address,
        contract,
        tokens: [
          {
            tokenMetadataURI,
            createReferral: REFERRAL_RECIPIENT,
            salesConfig: DEFAULT_SALES_CONFIG,
            mintToCreatorCount: 1,
            payoutRecipient: primaryWallet,
          },
        ],
        proposal: {
          title: values.proposalTitle,
          description: values.proposalDescription,
        },
      });
      setResult(data);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to build proposal");
    } finally {
      setBuilding(false);
    }
  };

  const reset = () => {
    setResult(null);
    form.reset();
  };

  return { form, build, building, result, reset };
}
