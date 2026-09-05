"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import ContentRenderer from "../Renderers";
import { DETAIL_IMAGE_SIZES } from "../Renderers/ImageContent";
import { useMomentProvider } from "@/providers/MomentProvider";
import { Protocol } from "@/types/moment";
import { useMomentCollectionCarouselProvider } from "@/providers/MomentCollectionCarouselProvider";

const MomentMediaFrame = () => {
  const { metadata, fetchMomentData, protocol } = useMomentProvider();
  const { canNavigate, counter, goPrev, goNext } = useMomentCollectionCarouselProvider();

  if (!metadata) return null;

  return (
    <div className="relative h-[min(70vh,560px)] w-full overflow-hidden rounded-[12px] border border-[#E4E0D7] bg-[repeating-linear-gradient(45deg,#F1EEE8_0_12px,#EAE6DD_12px_24px)] shadow-[0_8px_26px_-12px_rgba(27,21,4,.3)] md:h-full md:min-h-0 md:shadow-[0_10px_34px_-14px_rgba(27,21,4,.32)]">
      <div className="relative h-full min-h-0 w-full overflow-hidden font-spectral [&_iframe]:aspect-video [&_iframe]:h-auto [&_iframe]:max-h-full [&_iframe]:w-full [&_img]:max-h-full [&_img]:object-contain [&_video]:h-auto [&_video]:max-h-full [&_video]:w-full [&_video]:object-contain [&_.pdf-viewer-root]:!h-full [&_.pdf-viewer-root]:!max-h-full [&_.pdf-viewer-root]:!min-h-0 [&_.writing-root]:!h-full [&_.writing-root]:!max-h-full [&_.writing-root>[role=region]]:!h-full [&_.writing-root>[role=region]]:!max-h-full [&_.writing-root>[role=region]]:!pt-12">
        <ContentRenderer
          metadata={metadata}
          variant="fill"
          sizes={DETAIL_IMAGE_SIZES}
          onRefresh={async () => {
            const result = await fetchMomentData();
            return result.data?.metadata?.animation_url;
          }}
        />
      </div>
      {protocol === Protocol.InProcess && (
        <span className="pointer-events-none absolute left-3 top-3 z-[1] rounded-[5px] bg-[rgba(27,21,4,.72)] px-2.5 py-1 font-archivo-medium text-[10.5px] tracking-wide text-white">
          in_process
        </span>
      )}
      {counter && (
        <span className="pointer-events-none absolute right-3 top-3 z-[1] rounded-[5px] bg-[rgba(255,255,255,.9)] px-2.5 py-1 font-archivo-medium text-[10.5px] tracking-wide text-[#6B6456]">
          {counter}
        </span>
      )}
      {canNavigate && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous moment in collection"
            className="absolute left-2.5 top-1/2 z-[1] flex size-[34px] -translate-y-1/2 items-center justify-center rounded-full border-none bg-[rgba(255,255,255,.92)] text-grey-moss-900 shadow-[0_2px_8px_rgba(27,21,4,.16)] transition-colors hover:bg-white"
          >
            <ChevronLeft className="size-[17px]" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next moment in collection"
            className="absolute right-2.5 top-1/2 z-[1] flex size-[34px] -translate-y-1/2 items-center justify-center rounded-full border-none bg-[rgba(255,255,255,.92)] text-grey-moss-900 shadow-[0_2px_8px_rgba(27,21,4,.16)] transition-colors hover:bg-white"
          >
            <ChevronRight className="size-[17px]" strokeWidth={1.75} />
          </button>
        </>
      )}
    </div>
  );
};

export default MomentMediaFrame;
