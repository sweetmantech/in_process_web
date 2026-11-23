import { getAddress } from "viem";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { getMomentApi } from "@/lib/moment/getMomentApi";
import { Moment, MomentApiResponse, MomentFetchOptions, MomentSaleConfig } from "@/types/moment";
import useMigratedCollectionRedirect from "./useMigratedCollectionRedirect";
import { MOMENT_FETCH_RETRY, MOMENT_FETCH_TIMEOUT_MS } from "@/lib/consts";

interface UseMomentDataOptions extends MomentFetchOptions {
  initialData?: MomentApiResponse;
}

const useMomentData = (moment: Moment, options?: UseMomentDataOptions) => {
  const { collectionAddress, tokenId, chainId } = moment;
  const { primaryWallet } = useWalletsProvider();
  const {
    initialData,
    timeoutMs = MOMENT_FETCH_TIMEOUT_MS,
    retry = MOMENT_FETCH_RETRY,
  } = options ?? {};

  const query = useQuery({
    queryKey: ["tokenInfo", collectionAddress, tokenId, chainId],
    queryFn: () => getMomentApi(moment, AbortSignal.timeout(timeoutMs)),
    enabled: Boolean(collectionAddress && tokenId && chainId),
    initialData,
    initialDataUpdatedAt: initialData ? 0 : undefined,
    staleTime: 1000 * 60 * 5,
    retry,
  });

  const saleConfig = (query.data?.sale as MomentSaleConfig) ?? null;
  const metadata = query.data?.metadata ?? null;
  const video = query.data?.video ?? null;
  const owner = query.data?.owner ?? null;
  const tokenUri = query.data?.uri ?? null;
  const momentAdmins = query.data?.admins ?? null;
  const protocol = query.data?.protocol ?? null;
  const soldOut = query.data?.soldOut ?? false;

  const isSetSale = useMemo(() => {
    return saleConfig ? BigInt(saleConfig.saleEnd) > BigInt(0) : false;
  }, [saleConfig]);

  const isOwner = useMemo(() => {
    return Boolean(primaryWallet && owner && getAddress(primaryWallet) === getAddress(owner));
  }, [primaryWallet, owner]);

  const isSaleActive = useMemo(() => {
    if (!saleConfig) return false;
    const saleStartMs = saleConfig.saleStart * 1000;
    return saleStartMs < Date.now();
  }, [saleConfig]);

  useMigratedCollectionRedirect(metadata);

  return {
    saleConfig,
    protocol,
    metadata,
    video,
    tokenUri,
    momentAdmins,
    isLoading: query.isLoading,
    isError: query.isError,
    isSetSale,
    fetchMomentData: query.refetch,
    owner,
    isOwner,
    isSaleActive,
    soldOut,
  };
};

export default useMomentData;
