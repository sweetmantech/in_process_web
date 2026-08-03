"use client";

import { useEffect } from "react";
import type { CollectedItem } from "./types";
import { formatCollectedUsd, getCollectedArtStyle } from "./artStyle";

type Props = {
  item: CollectedItem;
  onClose: () => void;
};

const CollectedDetailModal = ({ item, onClose }: Props) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const contract =
    `0x${((item.id * 7654321 + 2246402).toString(16)).slice(0, 8)}…9f${item.id}`;

  const rows = [
    { k: "Network", v: item.network, accent: false, muted: false },
    {
      k: "Last price",
      v: `${item.price} ${item.currency}`,
      accent: true,
      muted: false,
    },
    { k: "Est. USD", v: formatCollectedUsd(item.usd), accent: false, muted: false },
    { k: "Acquired", v: item.acquiredLabel, accent: false, muted: false },
    { k: "Owner", v: item.creator, accent: false, muted: false },
    { k: "Contract", v: contract, accent: false, muted: true },
  ];

  return (
    <div
      className="absolute inset-0 z-[60] flex animate-fadeIn items-center justify-center bg-[rgba(40,36,28,0.4)] p-7 backdrop-blur-[3px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="max-h-[94%] w-[min(440px,100%)] animate-riseIn overflow-y-auto rounded-[14px] bg-[#fffdf6] shadow-[0_30px_80px_rgba(0,0,0,0.3)]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
      >
        <div style={getCollectedArtStyle(item, 320)}>
          <span className="absolute left-2.5 top-2.5 rounded-[5px] bg-[rgba(28,26,23,0.82)] px-[9px] py-[3px] font-archivo-medium text-[11px] text-[#f4f0e6]">
            in_process
          </span>
        </div>
        <div className="px-6 pb-6 pt-[22px]">
          <div className="mb-1.5 font-archivo text-xs text-[#8a8578]">
            #{item.tokenNumber} in{" "}
            <span className="font-spectral-italic text-[#1c1a17] underline underline-offset-2">
              {item.collection}
            </span>
          </div>
          <h2 className="mb-1 font-spectral-medium text-[28px] leading-[1.06] text-[#1c1a17]">
            {item.title}
          </h2>
          <div className="font-archivo text-xs text-[#8a8578]">by {item.creator}</div>
          <div className="my-[18px] mb-5 border-t border-[rgba(28,26,23,0.1)]">
            {rows.map((row) => (
              <div
                key={row.k}
                className="flex items-center justify-between gap-3 border-b border-[rgba(28,26,23,0.08)] py-[11px]"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8a8578]">
                  {row.k}
                </span>
                <span
                  className={`text-right font-mono text-xs ${
                    row.accent
                      ? "font-medium text-[#b57b34]"
                      : row.muted
                        ? "text-[#8a8578]"
                        : "text-[#1c1a17]"
                  }`}
                >
                  {row.v}
                </span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-[#1c1a17] py-3 font-archivo-medium text-[13px] text-[#f4f0e6]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectedDetailModal;
