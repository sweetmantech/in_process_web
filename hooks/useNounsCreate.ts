"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConnectWallet } from "@privy-io/react-auth";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { useMetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import useConnectedWallet from "@/hooks/useConnectedWallet";
import { getNounsProposalActionApi } from "@/lib/nouns/getNounsProposalActionApi";
import { checkNounsProposalEligibility } from "@/lib/nouns/checkNounsProposalEligibility";
import { submitNounsProposalTx } from "@/lib/nouns/submitNounsProposalTx";
import { REFERRAL_RECIPIENT } from "@/lib/consts";
import { NOUNS_CHAIN_ID } from "@/lib/nouns/consts";
import getSalesConfig from "@/lib/zora/getSalesConfig";
import getSaleConfigType from "@/lib/getSaleConfigType";
import { NounsSalesConfig } from "@/types/nouns";
import { Address } from "viem";

export interface NounsCreateFormValues {
  proposalTitle: string;
  proposalDescription: string;
}

export default function useNounsCreate() {
  const { push } = useRouter();
  const { primaryWallet } = useWalletsProvider();
  const { externalWallet } = useConnectedWallet();
  const { connectWallet } = useConnectWallet();
  const { generateMetadataUri } = useMetadataUploadProvider();
  const { price, priceUnit, startDate, name } = useMetadataFormProvider();
  const [creating, setCreating] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<NounsCreateFormValues>({
    defaultValues: {
      proposalTitle: "",
      proposalDescription: "",
    },
  });

  const create = async (values: NounsCreateFormValues) => {
    if (!primaryWallet) {
      toast.error("Wallet not connected");
      return;
    }

    if (!externalWallet) {
      connectWallet();
      return;
    }

    try {
      setCreating(true);

      const isEligible = await checkNounsProposalEligibility(
        primaryWallet as Address,
        NOUNS_CHAIN_ID
      );
      if (!isEligible) return;

      const tokenMetadataURI = await generateMetadataUri();
      if (!tokenMetadataURI) throw new Error("Failed to upload media");
      if (!name) throw new Error("Collection name is required");

      const contract = {
        name,
        uri: tokenMetadataURI,
      };

      const data = await getNounsProposalActionApi({
        chainId: NOUNS_CHAIN_ID,
        account: primaryWallet as Address,
        contract,
        tokens: [
          {
            tokenMetadataURI,
            createReferral: REFERRAL_RECIPIENT,
            salesConfig: getSalesConfig(
              getSaleConfigType(priceUnit === "usdc" ? "erc20Mint" : "fixedPrice"),
              price,
              startDate
            ) as NounsSalesConfig,
            mintToCreatorCount: 1,
            payoutRecipient: primaryWallet,
          },
        ],
        proposal: {
          title: values.proposalTitle,
          description: values.proposalDescription,
        },
      });

      setCreating(false);
      setSubmitting(true);

      const { proposalId, txHash } = await submitNounsProposalTx({
        externalWallet,
        chainId: NOUNS_CHAIN_ID,
        governor: data.governor,
        args: data.args,
      });

      push(`/nouns/success?proposalId=${proposalId.toString()}&txHash=${txHash}`);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to create proposal");
    } finally {
      setCreating(false);
      setSubmitting(false);
    }
  };

  const reset = () => {
    form.reset();
  };

  const building = creating || submitting;

  return { form, create, creating, submitting, building, reset };
}
