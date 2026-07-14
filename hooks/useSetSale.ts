import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";
import { formatEther, formatUnits, maxUint64, parseEther, parseUnits } from "viem";
import { toast } from "sonner";
import { useMomentProvider } from "@/providers/MomentProvider";
import { setSale } from "@/lib/moment/setSale";
import { MomentType } from "@/types/moment";
import { isPermissionError } from "@/lib/errors/isPermissionError";

const useSetSale = () => {
  const { moment, saleConfig: sale } = useMomentProvider();
  const { getAccessToken } = usePrivy();
  const [saleStart, setSaleStart] = useState<Date>(new Date());
  const [saleEnd, setSaleEnd] = useState<Date | undefined>(undefined);
  const [priceInput, setPriceInput] = useState<string>("");
  const [isErc20, setIsErc20] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const priceUnit = isErc20 ? "USDC" : "ETH";

  useEffect(() => {
    if (!sale) return;
    const erc20 = sale.type === MomentType.Erc20Mint;
    setIsErc20(erc20);
    setSaleStart(
      BigInt(sale.saleStart) === BigInt(0)
        ? new Date()
        : new Date(parseInt(sale.saleStart.toString(), 10) * 1000)
    );
    const saleEndBigInt = BigInt(sale.saleEnd);
    setSaleEnd(
      saleEndBigInt === BigInt(0) || saleEndBigInt === maxUint64
        ? undefined
        : new Date(parseInt(sale.saleEnd.toString(), 10) * 1000)
    );
    setPriceInput(
      erc20 ? formatUnits(BigInt(sale.pricePerToken), 6) : formatEther(BigInt(sale.pricePerToken))
    );
  }, [sale]);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) throw new Error("Authentication required");
      const pricePerToken = isErc20
        ? parseUnits(priceInput, 6).toString()
        : parseEther(priceInput).toString();
      const saleStartUnix = Math.floor(saleStart.getTime() / 1000);
      const saleEndUnix = saleEnd ? Math.floor(saleEnd.getTime() / 1000) : undefined;
      return setSale(accessToken, moment, saleStartUnix, pricePerToken, saleEndUnix);
    },
    onSuccess: () => toast.success("Sale updated successfully"),
    onError: (error: any) => {
      if (isPermissionError(error)) {
        setShowPermissionModal(true);
      } else {
        toast.error(error?.message || "Failed to update sale");
      }
    },
  });

  return {
    saleStart,
    setSaleStart,
    saleEnd,
    setSaleEnd,
    priceInput,
    setPriceInput,
    priceUnit,
    setSale: () => mutate(),
    isLoading: isPending,
    showPermissionModal,
    closePermissionModal: () => setShowPermissionModal(false),
  };
};

export default useSetSale;
