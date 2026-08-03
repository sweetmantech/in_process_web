"use client";

import type { CollectedItem } from "./types";
import { getCollectedArtStyle } from "./artStyle";

type Props = {
  item: CollectedItem;
  onOpen: () => void;
};

const CollectedCard = ({ item, onOpen }: Props) => {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="mb-3.5 block w-full break-inside-avoid overflow-hidden rounded-xl border border-[rgba(28,26,23,0.05)] bg-[#fffdf6] text-left shadow-[0_1px_2px_rgba(28,26,23,0.06),0_8px_22px_rgba(28,26,23,0.05)] transition-[transform,box-shadow] duration-150 hover:-translate-y-[3px] hover:shadow-[0_6px_14px_rgba(28,26,23,0.1),0_18px_40px_rgba(28,26,23,0.12)]"
    >
      <div style={getCollectedArtStyle(item)}>
        <span className="absolute left-2.5 top-2.5 rounded-[5px] bg-[rgba(28,26,23,0.82)] px-[9px] py-[3px] font-archivo-medium text-[11px] text-[#f4f0e6]">
          in_process
        </span>
      </div>
      <div className="px-3.5 pb-3.5 pt-3">
        <div className="mb-2 flex items-baseline justify-between gap-2.5">
          <h3 className="m-0 truncate font-spectral-medium text-base leading-tight text-[#1c1a17]">
            {item.title}
          </h3>
          <span className="shrink-0 font-spectral text-[12.5px] text-[#b57b34]">
            {item.acquiredLabel}
          </span>
        </div>
        <div className="mb-[9px] flex items-center gap-[7px]">
          <span
            className="inline-block size-2 shrink-0 rounded-full"
            style={{ background: item.networkDot }}
          />
          <span className="font-archivo text-[11.5px] text-[#8a8578]">
            #{item.tokenNumber} in{" "}
            <span className="font-spectral-italic text-[#1c1a17] underline underline-offset-2">
              {item.collection}
            </span>
          </span>
        </div>
        <div className="flex items-baseline justify-between border-t border-[rgba(28,26,23,0.08)] pt-[9px]">
          <span className="font-archivo text-xs text-[#8a8578]">by {item.creator}</span>
          <span className="font-mono text-[12.5px] font-medium text-[#1c1a17]">
            {item.price} {item.currency}
          </span>
        </div>
      </div>
    </button>
  );
};

export default CollectedCard;
