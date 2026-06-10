"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { mainnet } from "viem/chains";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { createNounsProposalApi } from "@/lib/nouns/createNounsProposalApi";
import { REFERRAL_RECIPIENT } from "@/lib/consts";
import {
  CreateNounsProposalResult,
  NounsProposalFormValues,
  NounsSalesConfig,
} from "@/types/nouns";
import { Address } from "viem";

const DEFAULT_SALES_CONFIG: NounsSalesConfig = {
  type: "ZoraTimedSaleStrategy",
  pricePerToken: "0",
  saleStart: "0",
  saleEnd: "18446744073709551615",
};

export default function useNounsProposal() {
  const { primaryWallet } = useWalletsProvider();
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<CreateNounsProposalResult | null>(null);

  const form = useForm<NounsProposalFormValues>({
    defaultValues: {
      chainId: mainnet.id,
      proposalTitle: "",
      proposalDescription: "",
      contractType: "new",
      contractAddress: "",
      collectionName: "",
      collectionUri: "",
      tokenMetadataURI: "",
    },
  });

  const submit = async (values: NounsProposalFormValues) => {
    if (!primaryWallet) {
      toast.error("Wallet not connected");
      return;
    }

    const contract =
      values.contractType === "existing"
        ? { address: values.contractAddress }
        : { name: values.collectionName, uri: values.collectionUri };

    try {
      setSubmitting(true);
      const data = await createNounsProposalApi({
        chainId: values.chainId,
        account: primaryWallet as Address,
        contract,
        tokens: [
          {
            tokenMetadataURI: values.tokenMetadataURI,
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
      setSubmitting(false);
    }
  };

  const reset = () => {
    setResult(null);
    form.reset();
  };

  return { form, submit, submitting, result, reset };
}
