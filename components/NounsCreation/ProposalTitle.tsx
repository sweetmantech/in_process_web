"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNounsProposalProvider } from "@/providers/NounsCreateProvider/NounsProposalProvider";

const ProposalTitle = () => {
  const { form, building } = useNounsProposalProvider();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <Label className="text-md font-archivo">proposal title</Label>
      <Input
        {...register("proposalTitle", { required: "Proposal title is required" })}
        placeholder="e.g. Mint a Moment via In•Process"
        className="rounded-[0px] border border-grey bg-white !font-spectral !ring-0 !ring-offset-0"
        disabled={building}
      />
      {errors.proposalTitle && (
        <p className="font-spectral text-xs text-red-500">{errors.proposalTitle.message}</p>
      )}
    </div>
  );
};

export default ProposalTitle;
