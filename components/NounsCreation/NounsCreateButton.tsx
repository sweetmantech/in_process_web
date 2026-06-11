"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNounsProposalProvider } from "@/providers/NounsCreateProvider/NounsProposalProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const NounsCreateButton = () => {
  const { form, build, building } = useNounsProposalProvider();
  const {
    link,
    embedCode,
    writingText,
    animationFile,
    imageFile,
    previewFile,
    form: metadataForm,
  } = useMetadataFormProvider();

  const hasMedia = Boolean(link || embedCode || imageFile || animationFile || writingText);
  const hasPreview = Boolean(previewFile || writingText);

  const handleBuild = async () => {
    const [isProposalValid, isMetadataValid] = await Promise.all([
      form.trigger(),
      metadataForm.trigger(),
    ]);

    if (!isMetadataValid || !isProposalValid) return;
    if (!hasPreview) {
      toast.error("Missing a preview image");
      return;
    }
    if (!hasMedia) {
      toast.error("Missing media");
      return;
    }

    form.handleSubmit(build)();
  };

  return (
    <Button
      type="button"
      onClick={handleBuild}
      disabled={building}
      className="disabled:opacity-1 z-10 w-fit transform self-center !rounded-sm bg-black px-14 py-5 !font-archivo !text-xl text-grey-eggshell transition-transform duration-150 hover:bg-grey-moss-300 disabled:!pointer-events-auto disabled:!cursor-not-allowed md:!mt-4 md:h-[60px] md:w-full md:py-6"
    >
      {building ? "building..." : "build proposal"}
    </Button>
  );
};

export default NounsCreateButton;
