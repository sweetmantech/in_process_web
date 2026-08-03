"use client";

import { Address } from "viem";
import { useParams } from "next/navigation";
import ProfileProvider from "@/providers/ProfileProvider";
import useIsMobile from "@/hooks/useIsMobile";
import CollectedProfile from "./CollectedProfile";
import CollectedToolbar from "./CollectedToolbar";
import CollectedCard from "./CollectedCard";
import CollectedDetailModal from "./CollectedDetailModal";
import { useCollectedPageState } from "./useCollectedPageState";

const DesktopCollectedPage = () => {
  const {
    items,
    typeTabs,
    contentType,
    setContentType,
    dense,
    setDense,
    resultCount,
    modalItem,
    openModal,
    closeModal,
  } = useCollectedPageState();

  return (
    <div className="relative flex min-h-full w-full grow flex-col animate-fadeIn bg-[#e9e6dc] text-[#1c1a17]">
      <div className="relative grow px-[26px] pb-11 pt-[22px]">
        <CollectedProfile />
        <CollectedToolbar
          tabs={typeTabs}
          active={contentType}
          onChange={setContentType}
          resultCount={resultCount}
          dense={dense}
          onDense={() => setDense(true)}
          onGrid={() => setDense(false)}
        />
        <div
          className="w-full"
          style={{
            columnWidth: dense ? "176px" : "232px",
            columnGap: "14px",
          }}
        >
          {items.map((item) => (
            <CollectedCard key={item.id} item={item} onOpen={() => openModal(item.id)} />
          ))}
        </div>
        {modalItem && <CollectedDetailModal item={modalItem} onClose={closeModal} />}
      </div>
    </div>
  );
};

const CollectedPage = () => {
  const isMobile = useIsMobile();
  const { artistAddress } = useParams();

  return (
    <ProfileProvider address={artistAddress as Address}>
      {isMobile ? (
        <div className="flex grow items-center justify-center px-6 py-20 text-center font-spectral text-lg text-grey-moss-300">
          Collected moments desktop view coming soon on mobile.
        </div>
      ) : (
        <DesktopCollectedPage />
      )}
    </ProfileProvider>
  );
};

export default CollectedPage;
