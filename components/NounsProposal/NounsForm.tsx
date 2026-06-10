"use client";

import { UseFormReturn } from "react-hook-form";
import { mainnet, sepolia } from "viem/chains";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { NounsProposalFormValues } from "@/types/nouns";

interface NounsFormProps {
  form: UseFormReturn<NounsProposalFormValues>;
  onSubmit: (values: NounsProposalFormValues) => void;
  submitting: boolean;
}

const CHAIN_OPTIONS = [
  { label: "mainnet", id: mainnet.id },
  { label: "sepolia", id: sepolia.id },
];

const NounsForm = ({ form, onSubmit, submitting }: NounsFormProps) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = form;
  const contractType = watch("contractType");
  const chainId = watch("chainId");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex gap-2">
        {CHAIN_OPTIONS.map((chain) => (
          <button
            key={chain.id}
            type="button"
            onClick={() => setValue("chainId", chain.id)}
            className={`rounded-sm border px-4 py-1 font-archivo text-sm transition-colors ${
              chainId === chain.id
                ? "border-grey-moss-900 bg-grey-moss-900 text-grey-eggshell"
                : "border-grey bg-white text-grey-moss-400 hover:border-grey-moss-300"
            }`}
          >
            {chain.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <Label className="font-archivo">proposal title</Label>
        <Input
          {...register("proposalTitle", { required: "Title is required" })}
          placeholder="e.g. Mint a Moment via In•Process"
          className="rounded-none border-grey bg-white font-spectral"
          disabled={submitting}
        />
        {errors.proposalTitle && (
          <p className="font-spectral text-xs text-red-500">{errors.proposalTitle.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label className="font-archivo">proposal description</Label>
        <Textarea
          {...register("proposalDescription", { required: "Description is required" })}
          placeholder="Describe what this proposal does and why..."
          minRows={4}
          className="resize-none rounded-none border-grey bg-white font-spectral"
          disabled={submitting}
        />
        {errors.proposalDescription && (
          <p className="font-spectral text-xs text-red-500">{errors.proposalDescription.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label className="font-archivo">collection</Label>
        <div className="flex gap-2">
          {(["existing", "new"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setValue("contractType", type)}
              className={`rounded-sm border px-4 py-1 font-archivo text-sm transition-colors ${
                contractType === type
                  ? "border-grey-moss-900 bg-grey-moss-900 text-grey-eggshell"
                  : "border-grey bg-white text-grey-moss-400 hover:border-grey-moss-300"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {contractType === "existing" ? (
          <div className="flex flex-col gap-1">
            <Input
              {...register("contractAddress", { required: "Contract address is required" })}
              placeholder="0x..."
              className="rounded-none border-grey bg-white font-spectral"
              disabled={submitting}
            />
            {errors.contractAddress && (
              <p className="font-spectral text-xs text-red-500">{errors.contractAddress.message}</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <Input
                {...register("collectionName", { required: "Collection name is required" })}
                placeholder="collection name"
                className="rounded-none border-grey bg-white font-spectral"
                disabled={submitting}
              />
              {errors.collectionName && (
                <p className="font-spectral text-xs text-red-500">{errors.collectionName.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Input
                {...register("collectionUri", { required: "Collection metadata URI is required" })}
                placeholder="ipfs:// or ar:// URI for collection metadata"
                className="rounded-none border-grey bg-white font-spectral"
                disabled={submitting}
              />
              {errors.collectionUri && (
                <p className="font-spectral text-xs text-red-500">{errors.collectionUri.message}</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label className="font-archivo">token metadata URI</Label>
        <Input
          {...register("tokenMetadataURI", { required: "Token metadata URI is required" })}
          placeholder="ipfs:// or ar:// URI for token metadata"
          className="rounded-none border-grey bg-white font-spectral"
          disabled={submitting}
        />
        {errors.tokenMetadataURI && (
          <p className="font-spectral text-xs text-red-500">{errors.tokenMetadataURI.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="disabled:opacity-1 w-fit self-center rounded-sm bg-black px-14 py-5 font-archivo text-xl text-grey-eggshell transition-colors hover:bg-grey-moss-300 disabled:cursor-not-allowed md:mt-4 md:h-[60px] md:w-full md:py-6"
      >
        {submitting ? "building..." : "build proposal"}
      </Button>
    </form>
  );
};

export default NounsForm;
