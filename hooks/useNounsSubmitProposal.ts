"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useConnectWallet } from "@privy-io/react-auth";
import { Address } from "viem";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import useConnectedWallet from "./useConnectedWallet";
import { getNounsVotingPower } from "@/lib/nouns/getNounsVotingPower";
import { submitNounsProposalTx } from "@/lib/nouns/submitNounsProposalTx";
import { NOUNS_CHAIN_ID } from "@/lib/nouns/consts";
import { CreateNounsProposalResult } from "@/types/nouns";

export default function useNounsSubmitProposal() {
  const { primaryWallet } = useWalletsProvider();
  const { externalWallet } = useConnectedWallet();
  const { connectWallet } = useConnectWallet();
  const [submitting, setSubmitting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const { data: votingPower, isLoading: checkingVotingPower } = useQuery({
    queryKey: ["nouns-voting-power", primaryWallet, NOUNS_CHAIN_ID],
    queryFn: () => getNounsVotingPower(primaryWallet as Address, NOUNS_CHAIN_ID),
    enabled: Boolean(primaryWallet),
    staleTime: 30_000,
  });

  const submit = async (
    result: CreateNounsProposalResult,
    proposalTitle: string,
    proposalDescription: string
  ) => {
    if (!primaryWallet) {
      toast.error("Wallet not connected");
      return;
    }

    if (!externalWallet) {
      connectWallet();
      return;
    }

    try {
      setSubmitting(true);
      const hash = await submitNounsProposalTx({
        externalWallet,
        chainId: NOUNS_CHAIN_ID,
        transaction: result.transaction,
        proposalTitle,
        proposalDescription,
      });
      setTxHash(hash);
      toast.success("Proposal submitted on-chain!");
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to submit proposal");
    } finally {
      setSubmitting(false);
    }
  };

  return { submit, submitting, txHash, votingPower, checkingVotingPower };
}
