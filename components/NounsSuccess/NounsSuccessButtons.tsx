"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useNounsProposalProvider } from "@/providers/NounsCreateProvider/NounsProposalProvider";
import useProposalIdParam from "@/hooks/useProposalIdParam";
import { getNounsProposalUrl } from "@/lib/nouns/getNounsProposalUrl";
import { NOUNS_CHAIN_ID } from "@/lib/nouns/consts";

const NounsSuccessButtons = () => {
  const proposalId = useProposalIdParam();
  const searchParams = useSearchParams();
  const { reset } = useNounsProposalProvider();
  const { resetForm } = useMetadataFormProvider();
  const { push } = useRouter();

  const share = async () => {
    if (!proposalId) return;

    const txHash = searchParams.get("txHash") ?? undefined;
    const url = getNounsProposalUrl(proposalId, NOUNS_CHAIN_ID, txHash);

    await navigator.clipboard.writeText(url);
    toast.success("copied!");
  };

  const createAnother = () => {
    resetForm();
    reset();
    push("/nouns");
  };

  return (
    <div className="relative flex flex-col gap-4 pr-4 pt-4 md:flex-row md:gap-2">
      <div className="absolute -right-10 bottom-0 hidden aspect-[1/1] w-1/2 md:block">
        <Image
          src="/semi-transparent.png"
          alt="not found semi"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <button
        type="button"
        className="relative w-full rounded-sm bg-grey-moss-900 py-2 font-archivo text-2xl text-grey-eggshell hover:bg-grey-moss-300"
        onClick={createAnother}
      >
        create
      </button>
      <button
        type="button"
        className="relative w-full rounded-sm border border-grey-moss-900 bg-grey-moss-100 py-2 font-archivo text-2xl text-grey-moss-900 hover:border-grey-moss-300 hover:bg-grey-moss-300 hover:text-grey-eggshell"
        onClick={share}
      >
        share
      </button>
    </div>
  );
};

export default NounsSuccessButtons;
