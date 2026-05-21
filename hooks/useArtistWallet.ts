import { useCallback, useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useMiniAppProvider } from "@/providers/MiniAppProvider";
import { useConnection } from "wagmi";
import { Address } from "viem";
import getArtistWallets from "@/lib/artists/getArtistWallets";
import useConnectedWallet from "./useConnectedWallet";
import useAuthHeaders from "./useAuthHeaders";

type ArtistWalletState = {
  wallet: Address | undefined;
  isExternal: boolean;
  isLoaded: boolean;
};

const INITIAL_STATE: ArtistWalletState = { wallet: undefined, isExternal: false, isLoaded: false };

const useArtistWallet = () => {
  const { user } = usePrivy();
  const getAuthHeaders = useAuthHeaders();
  const { isMiniApp, miniAppReady } = useMiniAppProvider();
  const { address: farcasterAddress } = useConnection();
  const { privyWallet, isPrivyReady } = useConnectedWallet();

  const isSocialWallet = miniAppReady && (isMiniApp || Boolean(user?.email?.address));

  const [state, setState] = useState<ArtistWalletState>(INITIAL_STATE);

  const fetchArtistWallet = useCallback(async () => {
    const authHeaders = await getAuthHeaders();
    const wallets = await getArtistWallets(authHeaders);
    if (isMiniApp) {
      if (!farcasterAddress) return;
      setState({
        wallet: farcasterAddress,
        isExternal: Boolean(wallets?.social_wallet),
        isLoaded: true,
      });
      return;
    }

    if (!isPrivyReady) return;
    if (!privyWallet?.address) {
      setState({ wallet: undefined, isExternal: false, isLoaded: true });
      return;
    }

    const privyAddress = privyWallet.address as Address;
    setState({
      wallet: wallets?.artist_wallet ?? privyAddress,
      isExternal: Boolean(wallets?.artist_wallet),
      isLoaded: true,
    });
  }, [isMiniApp, farcasterAddress, privyWallet, isSocialWallet, isPrivyReady, getAuthHeaders]);

  useEffect(() => {
    fetchArtistWallet();
  }, [fetchArtistWallet]);

  return {
    artistWallet: state.wallet,
    isExternalWallet: state.isExternal,
    artistWalletLoaded: state.isLoaded,
    fetchArtistWallet,
    getAuthHeaders,
  };
};

export default useArtistWallet;
