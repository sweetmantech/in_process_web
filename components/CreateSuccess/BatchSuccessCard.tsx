"use client";

import Image from "next/image";
import Link from "next/link";
import { CHAIN, SITE_ORIGINAL_URL } from "@/lib/consts";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";

interface BatchSuccessCardProps {
  name: string;
  previewUrl: string;
  tokenId: string;
  contractAddress: string;
}

const BatchSuccessCard = ({
  name,
  previewUrl,
  tokenId,
  contractAddress,
}: BatchSuccessCardProps) => {
  const shortNetwork = getShortNetworkName(CHAIN.name.toLowerCase());
  const momentUrl = `${SITE_ORIGINAL_URL}/collect/${shortNetwork}:${contractAddress}/${tokenId}`;

  return (
    <Link
      href={momentUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-lg border border-grey-moss-300 bg-grey-moss-100 transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-grey-moss-200">
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="flex size-full items-center justify-center text-grey-moss-400">
            <span className="font-archivo text-2xl">✓</span>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-green-500/10 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="rounded-full bg-white/90 px-2 py-1 font-archivo text-xs text-grey-moss-900">
            view →
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-0.5 px-2 py-2">
        <p className="truncate font-archivo-medium text-xs text-grey-moss-900">{name}</p>
        <p className="font-archivo text-xs text-grey-moss-500">#{tokenId}</p>
      </div>
    </Link>
  );
};

export default BatchSuccessCard;
