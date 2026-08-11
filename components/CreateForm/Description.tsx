"use client";

import { Textarea } from "../ui/textarea";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const Description = () => {
  const { creating } = useMomentCreateProvider();
  const { form } = useMetadataFormProvider();

  return (
    <div className="flex w-full flex-col items-start">
      <label
        htmlFor="description"
        className="mb-1 font-archivo-medium text-[10.5px] uppercase tracking-[0.14em] text-[#A8A296]"
      >
        description
      </label>
      <Textarea
        id="description"
        {...form.register("description")}
        placeholder="What's the story behind this?"
        minRows={2}
        disabled={Boolean(creating)}
        className="resize-none rounded-none border-0 border-b-[1.5px] border-[#DCD6CA] bg-transparent px-0.5 py-2 font-archivo text-[15px] text-grey-moss-900 shadow-none outline-none ring-0 placeholder:text-[#B4AEA2] focus-visible:border-grey-moss-900 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      {form.formState.errors.description && (
        <p className="mt-1 font-archivo text-xs text-red-500">
          {form.formState.errors.description.message}
        </p>
      )}
    </div>
  );
};

export default Description;
