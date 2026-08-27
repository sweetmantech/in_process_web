"use client";

import ContentRenderer from "../Renderers";
import { DETAIL_IMAGE_SIZES } from "../Renderers/ImageContent";
import { useMomentProvider } from "@/providers/MomentProvider";
import { Protocol } from "@/types/moment";

const MomentMediaFrame = () => {
  const { metadata, fetchMomentData, protocol } = useMomentProvider();
  if (!metadata) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-[12px] border border-[#E4E0D7] bg-[repeating-linear-gradient(45deg,#F1EEE8_0_12px,#EAE6DD_12px_24px)] shadow-[0_8px_26px_-12px_rgba(27,21,4,.3)] md:shadow-[0_10px_34px_-14px_rgba(27,21,4,.32)]">
      <div className="relative max-h-[calc(100vh-260px)] w-full overflow-hidden font-spectral [&_iframe]:aspect-video [&_iframe]:h-auto [&_iframe]:max-h-[calc(100vh-260px)] [&_iframe]:w-full [&_img]:max-h-[calc(100vh-260px)] [&_img]:object-contain [&_video]:h-auto [&_video]:max-h-[calc(100vh-260px)] [&_video]:w-full [&_video]:object-contain [&_.pdf-viewer-root]:!h-[calc(100vh-260px)] [&_.pdf-viewer-root]:!max-h-[calc(100vh-260px)] [&_.pdf-viewer-root]:!min-h-0 [&_.writing-root]:!h-[calc(100vh-260px)] [&_.writing-root]:!max-h-[calc(100vh-260px)] [&_.writing-root>[role=region]]:!h-full [&_.writing-root>[role=region]]:!max-h-full [&_.writing-root>[role=region]]:!pt-12">
        <ContentRenderer
          metadata={metadata}
          variant="natural"
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
    </div>
  );
};

export default MomentMediaFrame;
