import { Check, Copy, LayoutGrid, Share2, Webhook } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface ButtonsProps {
  shareUrl?: string;
  timelineHref?: string;
  shareTitle?: string;
}

const PRIMARY_BUTTON_CLASS =
  "flex-1 rounded-[12px] px-4 py-[15px] font-archivo-bold text-[15px] transition-colors";
const SECONDARY_BUTTON_CLASS =
  "flex-1 rounded-[11px] border border-[#E4E0D7] bg-white px-4 py-[13px] font-archivo-medium text-[13.5px] transition-colors hover:bg-[#F7F5F0]";

const Buttons = ({ shareUrl, timelineHref, shareTitle = "moment" }: ButtonsProps) => {
  const { push } = useRouter();
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = useMemo(() => `Just created "${shareTitle}" on In Process.`, [shareTitle]);

  const openWindow = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("copied!");
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleXShare = () => {
    if (!shareUrl) return;
    openWindow(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    );
  };

  const handleFarcasterShare = () => {
    if (!shareUrl) return;
    openWindow(
      `https://farcaster.xyz/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(shareUrl)}`
    );
  };

  return (
    <>
      <div className="mt-3 flex flex-col gap-3 md:flex-row md:gap-3">
        <button
          type="button"
          onClick={() => setShareOpen((current) => !current)}
          disabled={!shareUrl}
          className={`${PRIMARY_BUTTON_CLASS} inline-flex items-center justify-center gap-2 bg-grey-moss-900 text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-50`}
        >
          <Share2 className="size-[18px]" strokeWidth={1.75} />
          Share
        </button>
        <button
          type="button"
          onClick={() => timelineHref && push(timelineHref)}
          disabled={!timelineHref}
          className={`${PRIMARY_BUTTON_CLASS} inline-flex items-center justify-center gap-2 border border-[#DCD6CA] bg-transparent font-archivo-medium text-grey-moss-900 hover:bg-[#F1EEE8] disabled:cursor-not-allowed disabled:opacity-50`}
        >
          <LayoutGrid className="size-[18px]" strokeWidth={1.75} />
          Visit timeline
        </button>
      </div>
      {shareOpen && (
        <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={handleXShare}
            disabled={!shareUrl}
            className={`${SECONDARY_BUTTON_CLASS} disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <span className="font-archivo-bold">X</span>
            <span className="ml-2">Post</span>
          </button>
          <button
            type="button"
            onClick={handleFarcasterShare}
            disabled={!shareUrl}
            className={`${SECONDARY_BUTTON_CLASS} inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <Webhook className="size-4" strokeWidth={1.75} />
            Farcaster
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            disabled={!shareUrl}
            className={`${SECONDARY_BUTTON_CLASS} inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {copied ? (
              <Check className="size-4" strokeWidth={1.75} />
            ) : (
              <Copy className="size-4" strokeWidth={1.75} />
            )}
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      )}
    </>
  );
};

export default Buttons;
