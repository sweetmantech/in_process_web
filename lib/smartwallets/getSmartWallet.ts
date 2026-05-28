import { IN_PROCESS_API } from "@/lib/consts";

const getSmartWallet = async (artistId: string): Promise<string | null> => {
  try {
    const response = await fetch(`${IN_PROCESS_API}/smartwallet?artistId=${artistId}`);
    if (!response.ok) return null;

    const data = (await response.json()) as { address?: string };
    return data.address ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getSmartWallet;
