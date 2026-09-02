import { IN_PROCESS_API, SITE_ORIGINAL_URL } from "@/lib/consts";
import { IN_PUBLIC_1155, IN_PUBLIC_CHAIN_ID } from "@/lib/inpublic/constants";
import { Metadata } from "next";
import InPublicPageShell from "@/components/InPublicPage/InPublicPageShell";
import { callGetCollectionApi } from "@/lib/collection/callGetCollectionApi";
import fetchMetadata from "@/lib/arweave/fetchMetadata";
import truncateAddress from "@/lib/utils/truncateAddress";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { uri, creator, creator_username } = await callGetCollectionApi({
      collectionAddress: IN_PUBLIC_1155,
      chainId: String(IN_PUBLIC_CHAIN_ID),
    });
    const username = creator_username || truncateAddress(creator);
    const metadata = uri ? await fetchMetadata(uri) : null;
    const title = metadata?.name || "IN PUBLIC";
    const description = metadata?.description || `Imagined by ${username}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [
          `${IN_PROCESS_API}/og/moment?collectionAddress=${IN_PUBLIC_1155}&chainId=${IN_PUBLIC_CHAIN_ID}&tokenId=1`,
        ],
      },
      other: {
        "fc:frame": JSON.stringify({
          version: "next",
          imageUrl: `${IN_PROCESS_API}/og/moment?collectionAddress=${IN_PUBLIC_1155}&chainId=${IN_PUBLIC_CHAIN_ID}&tokenId=1`,
          aspectRatio: "3:2",
          button: {
            title,
            action: {
              type: "launch_frame",
              name: `${title} - in•process`,
              url: `${SITE_ORIGINAL_URL}/inpublic`,
              iconImageUrl: `${IN_PROCESS_API}/og/moment?collectionAddress=${IN_PUBLIC_1155}&chainId=${IN_PUBLIC_CHAIN_ID}&tokenId=1`,
              splashImageUrl: `${SITE_ORIGINAL_URL}/desktop_footer_logo.png`,
              splashBackgroundColor: "#e9ccbb",
            },
          },
        }),
      },
    };
  } catch {
    return { title: "IN PUBLIC", description: "Imagined by Yuri" };
  }
}

const InPublic = () => <InPublicPageShell />;

export default InPublic;
