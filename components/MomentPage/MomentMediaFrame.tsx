"use client";

import ContentRenderer from "../Renderers";
import { useMomentProvider } from "@/providers/MomentProvider";
import { Protocol } from "@/types/moment";

const MomentMediaFrame = () => {
  const { metadata, fetchMomentData, protocol } = useMomentProvider();
  if (!metadata) return null;

  return (
    <div className="relative w-full max-w-[520px] overflow-hidden rounded-[12px] border border-[#E4E0D7] bg-[repeating-linear-gradient(45deg,#F1EEE8_0_12px,#EAE6DD_12px_24px)] shadow-[0_10px_34px_-14px_rgba(27,21,4,.32)]">
      <div className="relative max-h-[calc(100vh-260px)] w-full overflow-hidden font-spectral [&_img]:max-h-[calc(100vh-260px)] [&_img]:object-contain">
        <ContentRenderer
          metadata={metadata}
          variant="natural"
          onRefresh={async () => {
            const result = await fetchMomentData();
            return result.data?.metadata?.animation_url;
          }}
        />
      </div>
      {protocol === Protocol.InProcess && (
        <span className="pointer-events-none absolute left-3 top-3 rounded-[5px] bg-[rgba(27,21,4,.72)] px-2.5 py-1 font-archivo-medium text-[10.5px] tracking-wide text-white">
          in_process
        </span>
      )}
    </div>
  );
};

export default MomentMediaFrame;
