"use client";

import useSetSale from "@/hooks/useSetSale";
import { useMomentProvider } from "@/providers/MomentProvider";
import SaleSkeleton from "./SaleSkeleton";
import SaleStartPicker from "./SaleStartPicker";
import SaleEndPicker from "./SaleEndPicker";
import SalePriceInput from "./SalePriceInput";
import PermissionErrorModal from "@/components/PermissionErrorModal";

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

  return (
    <div className="w-full font-archivo">
      <div className="mt-4 flex w-full max-w-md flex-col gap-2 rounded-2xl bg-white p-4 pt-4">
        {BigInt(saleConfig.saleEnd) === BigInt(0) ? (
          <div>sale is not yet activated.</div>
        ) : (
          <>
            <SaleStartPicker
              saleStart={saleStart}
              currentSaleStart={saleConfig.saleStart}
              setSaleStart={setSaleStart}
            />
            <SaleEndPicker
              saleEnd={saleEnd}
              currentSaleEnd={saleConfig.saleEnd}
              setSaleEnd={setSaleEnd}
            />
            <SalePriceInput
              priceInput={priceInput}
              priceUnit={priceUnit}
              disabled={isLoading}
              setPriceInput={setPriceInput}
            />
            <button
              className="w-fit rounded-md bg-black px-8 py-2 text-grey-eggshell disabled:opacity-50"
              onClick={setSale}
              disabled={isLoading || !isOwner}
            >
              {isLoading ? "setting..." : "set sale"}
            </button>
          </>
        )}
      </div>
      <PermissionErrorModal
        open={showPermissionModal}
        onClose={closePermissionModal}
        contractAddress={moment.collectionAddress}
      />
    </div>
  );
};

export default Sale;
