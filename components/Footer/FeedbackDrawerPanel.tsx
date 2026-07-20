import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FeedbackMediaAttachment from "@/components/Footer/FeedbackMediaAttachment";
import { UseSubmitFeedbackReturn } from "@/hooks/useSubmitFeedback";

interface FeedbackDrawerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  feedbackHook: UseSubmitFeedbackReturn;
}

const FeedbackDrawerPanel = ({ isOpen, onClose, feedbackHook }: FeedbackDrawerPanelProps) => {
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
  } = feedbackHook;

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40" onClick={onClose} />}
      <div
        className={`fixed bottom-[calc(74px+env(safe-area-inset-bottom,0px))] left-0 right-0 top-0 z-50 overflow-y-auto bg-white transition-transform duration-300 ease-out will-change-transform ${
          isOpen ? "translate-y-0" : "pointer-events-none translate-y-[2000px]"
        }`}
      >
        <div className="flex flex-col px-6 pb-4 pt-7">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-4 flex h-8 w-8 items-center justify-center text-grey-moss-400"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>

          <h2 className="mb-0.5 font-archivo text-2xl text-grey-moss-900">Let us hear from you</h2>
          <p className="mb-4 font-archivo text-sm italic text-grey-primary">
            How&apos;s your process?
          </p>

          <fieldset className="mb-3 flex flex-col gap-[5px]">
            <Label className="text-[10px] uppercase tracking-[0.1em] text-grey-moss-300">
              email
            </Label>
            <Input
              type="email"
              className="rounded-md border-grey-moss-100 bg-[#FDFCFA] py-2.5 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </fieldset>

          <fieldset className="flex flex-col gap-[5px]">
            <Label className="text-[10px] uppercase tracking-[0.1em] text-grey-moss-300">
              share feedback
            </Label>
            <Textarea
              className="resize-none rounded-md border-grey-moss-100 bg-[#FDFCFA] text-sm"
              minRows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </fieldset>

          <div className="mt-3">
            <FeedbackMediaAttachment
              mediaFile={mediaFile}
              mediaPreview={mediaPreview}
              onMediaChange={(file, preview) => {
                setMediaFile(file);
                setMediaPreview(preview);
              }}
            />
          </div>

          <button
            type="button"
            onClick={async () => {
              await submit();
              onClose();
            }}
            disabled={!feedback.trim() || !name.trim() || isLoading}
            className="mt-1 w-full rounded-lg bg-grey-moss-900 py-2.5 font-archivo text-xl text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </>
  );
};

export default FeedbackDrawerPanel;
