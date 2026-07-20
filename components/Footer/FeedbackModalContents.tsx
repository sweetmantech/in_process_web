import {
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { UseSubmitFeedbackReturn } from "@/hooks/useSubmitFeedback";
import FeedbackMediaAttachment from "./FeedbackMediaAttachment";

interface FeedbackModalContentsProps {
  submitFeedbackHook: UseSubmitFeedbackReturn;
}

const FeedbackModalContents = ({ submitFeedbackHook }: FeedbackModalContentsProps) => {
  const {
    feedback,
    setFeedback,
    name,
    setName,
    isLoading,
    submit,
    mediaFile,
    setMediaFile,
    mediaPreview,
    setMediaPreview,
  } = submitFeedbackHook;

  return (
    <DialogPortal>
      <DialogOverlay className="fixed inset-0 z-[99999999] bg-black/20 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogContent className="z-[99999999] flex w-[calc(100vw-2rem)] max-w-xl flex-col items-center !gap-0 overflow-hidden !rounded-3xl border-none !bg-white bg-transparent px-8 py-10 shadow-lg">
        <VisuallyHidden>
          <DialogTitle>Let us hear from you</DialogTitle>
        </VisuallyHidden>
        <DialogClose className="text-grey-moss-600 absolute right-4 top-4 flex h-6 w-6 items-center justify-center hover:text-black">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </DialogClose>
        <h2 className="mb-2 w-full text-center font-archivo text-2xl">Let us hear from you</h2>
        <p className="text-grey-moss-600 mb-6 w-full text-center font-archivo text-sm italic">
          How&apos;s your process?
        </p>
        <fieldset className="mb-3 flex w-full flex-col gap-[5px]">
          <Label className="text-[10px] uppercase tracking-[0.1em] text-grey-moss-300">email</Label>
          <Input
            type="email"
            className="rounded-md border-grey-moss-100 bg-[#FDFCFA] py-2.5 text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </fieldset>
        <fieldset className="flex w-full flex-col gap-[5px]">
          <Label className="text-[10px] uppercase tracking-[0.1em] text-grey-moss-300">
            share feedback
          </Label>
          <Textarea
            className="resize-none rounded-md border-grey-moss-100 bg-[#FDFCFA] text-sm"
            minRows={6}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </fieldset>

        <div className="mt-3 w-full">
          <FeedbackMediaAttachment
            mediaFile={mediaFile}
            mediaPreview={mediaPreview}
            onMediaChange={(file, preview) => {
              setMediaFile(file);
              setMediaPreview(preview);
            }}
          />
        </div>

        <div className="w-full">
          <button
            type="button"
            className="mt-4 w-full rounded-lg bg-black py-3 font-archivo text-xl text-grey-eggshell hover:bg-grey-moss-300 disabled:cursor-not-allowed disabled:bg-grey-moss-300"
            onClick={submit}
            disabled={!feedback.trim() || !name.trim() || isLoading}
          >
            {isLoading ? "sending..." : "send"}
          </button>
        </div>
      </DialogContent>
    </DialogPortal>
  );
};

export default FeedbackModalContents;
