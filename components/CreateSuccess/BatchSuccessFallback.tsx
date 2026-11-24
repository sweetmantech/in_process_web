import { ArrowLeft } from "lucide-react";
import Buttons from "./Buttons";
import UsernameFeedHint from "./UsernameFeedHint";

interface BatchSuccessFallbackProps {
  shareUrl?: string;
  timelineHref?: string;
  onBackToCreate: () => void;
}

const BatchSuccessFallback = ({
  shareUrl,
  timelineHref,
  onBackToCreate,
}: BatchSuccessFallbackProps) => (
  <div className="col-span-1 w-full md:col-span-2">
    <div className="mx-auto mt-2 w-full max-w-[1120px] px-[6px] pb-12 md:mt-9 md:px-10 md:pb-20">
      <button
        type="button"
        onClick={onBackToCreate}
        className="mb-6 inline-flex items-center gap-2 font-archivo-medium text-[14px] text-[#6B6456] transition-colors hover:text-grey-moss-900 md:mb-7"
      >
        <ArrowLeft className="size-[18px]" strokeWidth={1.75} />
        Back to create
      </button>
      <div className="max-w-[480px]">
        <h1 className="font-archivo-medium text-[28px] leading-[1.02] tracking-[-0.01em] text-grey-moss-900 md:text-[36px]">
          moments created
        </h1>
        <p className="mb-6 mt-4 font-spectral text-[16px] leading-[1.6] text-[#4E4A40]">
          Your moments are still processing. Refresh in a minute.
        </p>
        <Buttons shareUrl={shareUrl} timelineHref={timelineHref} shareLabel="Share all" />
        <UsernameFeedHint />
      </div>
    </div>
  </div>
);

export default BatchSuccessFallback;
