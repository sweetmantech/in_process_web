"use client";

import useSetSale from "@/hooks/useSetSale";
import { useMomentProvider } from "@/providers/MomentProvider";
import SaleSkeleton from "./SaleSkeleton";
import SaleStartPicker from "./SaleStartPicker";
import SaleEndPicker from "./SaleEndPicker";
import SalePriceInput from "./SalePriceInput";
import PermissionErrorModal from "@/components/PermissionErrorModal";

const FIELD_LABEL_CLASS = "font-archivo text-[10.5px] uppercase tracking-wider text-grey-moss-300";

const Sale = () => {
  const {
    saleStart,
    setSaleStart,
    saleEnd,
    setSaleEnd,
    priceInput,
    setPriceInput,
    priceUnit,
    setSale,
    isLoading,
    showPermissionModal,
    closePermissionModal,
  } = useSetSale();
  const { saleConfig, isOwner, moment } = useMomentProvider();

  if (!saleConfig) return <SaleSkeleton />;

  const isSaleInactive = BigInt(saleConfig.saleEnd) === BigInt(0);

  return (
    <div className="rounded-lg border border-grey-moss-100 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-4 flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-[#03c7f6]" />
        <span className={FIELD_LABEL_CLASS}>sale</span>
      </div>

      {isSaleInactive ? (
        <p className="font-spectral-italic text-sm text-grey-moss-300">
          Sale is not yet activated.
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <SaleStartPicker
              saleStart={saleStart}
              currentSaleStart={saleConfig.saleStart}
              setSaleStart={setSaleStart}
              disabled={isLoading || !isOwner}
            />
            <SaleEndPicker
              saleEnd={saleEnd}
              currentSaleEnd={saleConfig.saleEnd}
              setSaleEnd={setSaleEnd}
              saleStart={saleStart}
              disabled={isLoading || !isOwner}
            />
            <SalePriceInput
              priceInput={priceInput}
              priceUnit={priceUnit}
              disabled={isLoading || !isOwner}
              setPriceInput={setPriceInput}
            />
          </div>

          <div className="mt-[18px] flex items-center justify-end gap-3 border-t border-grey-moss-50 pt-4">
            <button
              type="button"
              onClick={setSale}
              disabled={isLoading || !isOwner}
              className="rounded-full border border-grey-moss-900 bg-grey-moss-900 px-[18px] py-2 font-archivo-medium text-xs text-white transition-colors hover:bg-black disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </>
      )}

      <PermissionErrorModal
        open={showPermissionModal}
        onClose={closePermissionModal}
        contractAddress={moment.collectionAddress}
      />
    </div>
  );
};

export default Sale;
