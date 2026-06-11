"use client";

import useBatchSuccess from "@/hooks/useBatchSuccess";
import BatchSuccessCard from "./BatchSuccessCard";

const BatchSuccess = () => {
  const {
    result,
    contractAddress,
    tokenIds,
    items,
    handleCreateMore,
    handleViewCollection,
    handleCopyAll,
  } = useBatchSuccess();

  if (!result) return null;

  return (
    <div className="col-span-3 flex w-full flex-col gap-6 pb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-archivo-medium text-2xl md:text-4xl">
            {tokenIds.length} moment{tokenIds.length !== 1 ? "s" : ""} created
          </p>
          <p className="font-archivo text-sm text-grey-moss-500">{new Date().toLocaleString()}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleCopyAll}
            className="rounded-sm border border-grey-moss-400 px-4 py-2 font-archivo text-sm text-grey-moss-700 hover:bg-grey-moss-200"
          >
            copy all links
          </button>
          <button
            type="button"
            onClick={handleViewCollection}
            className="rounded-sm border border-grey-moss-900 bg-grey-moss-100 px-4 py-2 font-archivo text-sm text-grey-moss-900 hover:bg-grey-moss-200"
          >
            view collection
          </button>
          <button
            type="button"
            onClick={handleCreateMore}
            className="rounded-sm bg-grey-moss-900 px-4 py-2 font-archivo text-sm text-grey-eggshell hover:bg-grey-moss-700"
          >
            create more
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
  );
};

export default BatchSuccess;
