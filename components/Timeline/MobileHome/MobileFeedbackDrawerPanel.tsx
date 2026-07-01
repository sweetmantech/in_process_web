import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import FeedbackMediaAttachment from "@/components/Footer/FeedbackMediaAttachment";
import { UseSubmitFeedbackReturn } from "@/hooks/useSubmitFeedback";

interface MobileFeedbackDrawerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  feedbackHook: UseSubmitFeedbackReturn;
}

const MobileFeedbackDrawerPanel = ({
  isOpen,
  onClose,
  feedbackHook,
}: MobileFeedbackDrawerPanelProps) => {
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
        className={`fixed bottom-[calc(74px+env(safe-area-inset-bottom,0px))] left-0 right-0 top-0 z-50 overflow-y-auto bg-white transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "pointer-events-none translate-y-full"
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

          <Label className="mb-1 font-archivo text-sm text-grey-primary">Email</Label>
          <input
            type="email"
            className="mb-3 w-full border border-black bg-white px-3 py-2 font-spectral outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Label className="mb-1 font-archivo text-sm text-grey-primary">Share feedback</Label>
          <textarea
            className="w-full border border-black bg-grey-moss-50 px-3 py-2 font-spectral outline-none"
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />

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

export default MobileFeedbackDrawerPanel;
