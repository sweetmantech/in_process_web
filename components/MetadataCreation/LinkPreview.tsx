import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import LinkInput from "./LinkInput";
import Image from "next/image";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { validateUrl } from "@/lib/url/validateUrl";
import { Globe } from "lucide-react";

const LinkPreview = () => {
  const { createdTokenId } = useMomentCreateProvider();
  const { link, previewFileUrl } = useMetadataFormProvider();

  if (createdTokenId) {
    return (
      <div className="flex flex-col items-center overflow-hidden rounded-2xl bg-white px-4 py-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={previewFileUrl} alt="not found image" />
        <div className="py-4 text-center">
          {validateUrl(link) ? (
            <a
              className="font-spectral-italic hover:text-grey-moss-400"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link}
            </a>
          ) : (
            <p className="font-spectral-italic text-grey-moss-400">Invalid or unsafe URL</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-[12px] border border-[#E4E0D7] bg-white px-4 py-4 shadow-[0_16px_40px_-22px_rgba(27,21,4,.3)] md:m-4 md:gap-2 md:rounded-2xl md:px-4 md:py-6 md:shadow-none">
      <div className="flex items-center gap-2.5 md:flex-col md:gap-2">
        <Image
          src="/link.svg"
          blurDataURL="/link.png"
          width={32}
          height={32}
          alt="not found link"
          className="size-8 shrink-0 md:size-11"
        />
        <p className="font-spectral-italic text-[17px] text-grey-moss-900 md:text-center md:font-archivo-medium md:text-base md:not-italic md:uppercase">
          Paste any link from the internet
        </p>
      </div>
      <LinkInput />
      {previewFileUrl ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-[11px] md:mt-4">
          <Image
            src={previewFileUrl}
            alt="not found image"
            fill
            sizes="(max-width: 768px) 90vw, 500px"
            className="object-contain"
          />
        </div>
      ) : (
        <div className="flex min-h-[96px] flex-col items-center justify-center gap-1.5 rounded-[11px] border-[1.5px] border-dashed border-[#DCD6CA] text-center text-[#A8A296] md:hidden">
          <Globe className="size-5" strokeWidth={1.75} />
          <div className="font-archivo text-[11px] uppercase tracking-[0.06em]">
            link preview appears here
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkPreview;
