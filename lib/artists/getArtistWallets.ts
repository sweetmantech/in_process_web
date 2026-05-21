import { IN_PROCESS_API } from "@/lib/consts";

const getArtistWallets = async (authHeaders: HeadersInit) => {
  try {
    const response = await fetch(`${IN_PROCESS_API}/artists/wallets`, {
      headers: authHeaders,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getArtistWallets;
