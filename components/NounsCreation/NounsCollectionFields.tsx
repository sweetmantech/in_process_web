"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNounsProposalProvider } from "@/providers/NounsCreateProvider/NounsProposalProvider";

const NounsCollectionFields = () => {
  const { form, building } = useNounsProposalProvider();
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;
  const contractType = watch("contractType");

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <Label className="text-md font-archivo">collection</Label>
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
        <div className="flex w-full flex-col gap-1">
          <Input
            {...register("contractAddress", { required: "Contract address is required" })}
            placeholder="0x..."
            className="rounded-[0px] border border-grey bg-white !font-spectral !ring-0 !ring-offset-0"
            disabled={building}
          />
          {errors.contractAddress && (
            <p className="font-spectral text-xs text-red-500">{errors.contractAddress.message}</p>
          )}
        </div>
      ) : (
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Input
              {...register("collectionName", { required: "Collection name is required" })}
              placeholder="collection name"
              className="rounded-[0px] border border-grey bg-white !font-spectral !ring-0 !ring-offset-0"
              disabled={building}
            />
            {errors.collectionName && (
              <p className="font-spectral text-xs text-red-500">{errors.collectionName.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Input
              {...register("collectionUri", { required: "Collection metadata URI is required" })}
              placeholder="ipfs:// or ar:// URI for collection metadata"
              className="rounded-[0px] border border-grey bg-white !font-spectral !ring-0 !ring-offset-0"
              disabled={building}
            />
            {errors.collectionUri && (
              <p className="font-spectral text-xs text-red-500">{errors.collectionUri.message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NounsCollectionFields;
