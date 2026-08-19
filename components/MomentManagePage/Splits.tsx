"use client";

import SplitsForm from "@/components/CreateForm/SplitsForm";
import PermissionErrorModal from "@/components/PermissionErrorModal";
import CopyButton from "@/components/CopyButton";
import useManageSplits from "@/hooks/useManageSplits";
import useLoadSplitRecipients from "@/hooks/useLoadSplitRecipients";
import { useMomentProvider } from "@/providers/MomentProvider";
import { mainnet, optimism, base, baseSepolia, zora } from "viem/chains";
import FundsRecipientHint from "./FundsRecipientHint";

const FIELD_LABEL_CLASS = "font-archivo text-[10.5px] uppercase tracking-wider text-grey-moss-300";

const SPLIT_ADDRESS_PILL_CLASS =
  "rounded-full border border-grey-moss-100 bg-white px-2.5 py-1 font-mono text-[11.5px] text-grey-moss-300 hover:text-grey-moss-900";

const EXPLORER_BY_CHAIN_ID: Record<number, string> = {
  [mainnet.id]: "https://etherscan.io",
  [optimism.id]: "https://optimistic.etherscan.io",
  [base.id]: "https://basescan.org",
  [baseSepolia.id]: "https://sepolia.basescan.org",
  [zora.id]: "https://explorer.zora.energy",
};

const Splits = () => {
  const { handleCreate, isCreating, isSplit, showPermissionModal, closePermissionModal } =
    useManageSplits();
  const { showCreate, recipients } = useLoadSplitRecipients();
  const { isOwner, moment, saleConfig } = useMomentProvider();

  const isBusy = isCreating;
  const isDisabled = isBusy || !isOwner;
  const fundsRecipientAddress = saleConfig?.fundsRecipient;
  const explorerBaseUrl = EXPLORER_BY_CHAIN_ID[moment.chainId] ?? "https://basescan.org";
  const splitUrl =
    fundsRecipientAddress && isSplit === true
      ? `https://app.splits.org/accounts/${fundsRecipientAddress}`
      : fundsRecipientAddress
        ? `${explorerBaseUrl}/address/${fundsRecipientAddress}`
        : undefined;

  return (
    <div className="rounded-lg border border-grey-moss-100 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-4 flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-[#887bff]" />
        <span className={FIELD_LABEL_CLASS}>splits</span>
      </div>

      {fundsRecipientAddress && splitUrl && (
        <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-grey-moss-100 bg-grey-moss-50/60 px-3.5 py-2.5">
          <CopyButton text={fundsRecipientAddress} className={SPLIT_ADDRESS_PILL_CLASS} />
          <a
            href={splitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full border border-grey-moss-900 bg-white px-[18px] py-2 font-archivo-medium text-xs text-grey-moss-900 transition-colors hover:bg-grey-moss-50 disabled:opacity-50"
          >
            {isSplit === true ? "View on 0xSplits" : "View on Explorer"}
          </a>
        </div>
      )}

      <FundsRecipientHint />

      <SplitsForm chainRecipients={isSplit === true ? recipients : undefined} />

      {showCreate && (
        <div className="mt-[18px] flex items-center justify-end gap-3 border-t border-grey-moss-50 pt-4">
          <button
            type="button"
            onClick={handleCreate}
            disabled={isDisabled}
            className="rounded-full border border-grey-moss-900 bg-grey-moss-900 px-[18px] py-2 font-archivo-medium text-xs text-white transition-colors hover:bg-black disabled:opacity-50"
          >
            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      )}

      <PermissionErrorModal
        open={showPermissionModal}
        onClose={closePermissionModal}
        contractAddress={moment.collectionAddress}
      />
    </div>
  );
};

export default Splits;
