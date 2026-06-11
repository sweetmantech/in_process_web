"use client";

import Image from "next/image";
import useBatchSuccess from "@/hooks/useBatchSuccess";
import BatchSuccessCard from "./BatchSuccessCard";

const BatchSuccess = () => {
  const {
    result,
    contractAddress,
    tokenIds,
    items,
    collectionName,
    collectionDescription,
    handleCreateMore,
    handleShare,
  } = useBatchSuccess();

  if (!result) return null;

  return (
    <>
      <div className="col-span-1 h-fit">
        <div className="flex w-full items-end gap-3">
          <div className="relative w-full">
            <p className="font-archivo-medium text-2xl md:text-4xl xl:text-5xl">
              {tokenIds.length} moment{tokenIds.length !== 1 ? "s" : ""} created
            </p>
            <p className="font-archivo text-sm text-grey-moss-500">{new Date().toLocaleString()}</p>
            <div className="relative flex flex-col gap-4 pr-4 pt-4 md:gap-2">
              <div className="absolute -right-10 bottom-0 hidden aspect-[1/1] w-1/2 md:block">
                <Image
                  src="/semi-transparent.png"
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </div>
              <div className="relative flex flex-col gap-4 md:flex-row md:gap-2">
                <button
                  type="button"
                  onClick={handleCreateMore}
                  className="relative w-full rounded-sm bg-grey-moss-900 py-2 font-archivo text-2xl text-grey-eggshell hover:bg-grey-moss-300"
                >
                  create more
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="relative w-full rounded-sm border border-grey-moss-900 bg-grey-moss-100 py-2 font-archivo text-2xl text-grey-moss-900 hover:border-grey-moss-300 hover:bg-grey-moss-300 hover:text-grey-eggshell"
                >
                  share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-1">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((item, idx) => (
            <BatchSuccessCard
              key={item.tokenId || idx}
              name={item.name}
              previewUrl={item.previewUrl}
              tokenId={item.tokenId}
              contractAddress={contractAddress}
            />
          ))}
        </div>
      </div>

      <div className="col-span-1 w-full md:pl-12">
        <p className="text-center font-archivo-medium text-2xl md:text-left md:text-4xl">
          {collectionName}
        </p>
        {collectionDescription && (
          <p className="!m-0 text-center font-archivo text-sm text-grey-moss-500 md:text-left">
            {collectionDescription}
          </p>
        )}
      </div>
    </>
  );
};

export default BatchSuccess;
