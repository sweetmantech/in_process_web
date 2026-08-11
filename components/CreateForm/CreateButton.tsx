"use client";

import { Button } from "@/components/ui/button";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { toast } from "sonner";
import { CircleDot } from "lucide-react";

const CreateButton = () => {
  const { create, creating } = useMomentCreateProvider();
  const { link, embedCode, writingText, animationFile, imageFile, previewFile, form } =
    useMetadataFormProvider();

  const hasMedia = Boolean(link || embedCode || imageFile || animationFile || writingText);
  const hasPreview = Boolean(previewFile || writingText);

  const toastCreateError = () => {
    const formIsValid = form.formState.isValid;
    if (!formIsValid) {
      const errors = form.formState.errors;
      if (errors.name) {
        toast.error(errors.name.message || "Title is required");
      } else if (errors.price) {
        toast.error(errors.price.message || "Price is required");
      } else if (errors.splits) {
        toast.error(errors.splits.message || "Splits validation failed");
      } else {
        toast.error("Please fix form errors");
      }
    } else if (!hasPreview) {
      toast.error("Missing a preview image");
    } else if (!hasMedia) {
      toast.error("Missing media");
    } else {
      toast.error("Error creating");
    }
  };

  const handleCreate = async () => {
    const isValid = await form.trigger();
    const canCreate = Boolean(!creating && isValid && hasPreview && hasMedia);

    if (!canCreate) {
      toastCreateError();
      return;
    }
    await create();
  };

  return (
    <Button
      onClick={handleCreate}
      disabled={creating}
      className="disabled:opacity-1 z-10 flex w-full items-center justify-center gap-2 self-center !rounded-lg bg-grey-moss-900 px-4 py-4 !font-archivo-bold !text-[15.5px] text-white transition-colors hover:!bg-black disabled:!pointer-events-auto disabled:!cursor-not-allowed md:h-auto md:w-auto md:min-w-[160px] md:px-8 md:py-3.5"
    >
      <CircleDot className="size-[18px]" strokeWidth={1.75} />
      {creating ? "creating..." : "create"}
    </Button>
  );
};

export default CreateButton;
