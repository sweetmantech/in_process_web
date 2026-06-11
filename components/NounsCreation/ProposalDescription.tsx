"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNounsProposalProvider } from "@/providers/NounsCreateProvider/NounsProposalProvider";

const ProposalDescription = () => {
  const { form, building } = useNounsProposalProvider();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <Label className="text-md font-archivo">proposal description</Label>
      <Textarea
        {...register("proposalDescription", { required: "Proposal description is required" })}
        placeholder="Describe what this proposal does and why..."
        minRows={4}
        className="resize-none rounded-none border-grey bg-white font-spectral"
        disabled={building}
      />
      {errors.proposalDescription && (
        <p className="font-spectral text-xs text-red-500">{errors.proposalDescription.message}</p>
      )}
    </div>
  );
};

export default ProposalDescription;
