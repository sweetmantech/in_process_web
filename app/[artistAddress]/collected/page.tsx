import { Metadata } from "next";
import { dehydrate } from "@tanstack/react-query";
import CollectedPage from "@/components/CollectedPage";
import ProfileHydrationBoundary from "@/components/Profile/ProfileHydrationBoundary";
import { SITE_ORIGINAL_URL, IN_PROCESS_API } from "@/lib/consts";
import truncateAddress from "@/lib/utils/truncateAddress";
import { Address } from "viem";
import { getArtistProfile } from "@/lib/artists/getArtistProfile";
import { getQueryClient } from "@/lib/react-query/getQueryClient";
import { prefetchCollectedProfilePage } from "@/lib/react-query/prefetchCollectedProfilePage";

type Props = {
  params: Promise<{ artistAddress: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { artistAddress } = await params;

  try {
    const profile = await getArtistProfile(artistAddress as Address);
    const name = profile?.username || truncateAddress(artistAddress);
    const title = `${name} · Collected`;
    const description = profile?.bio || "Collected moments on In Process";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [`${IN_PROCESS_API}/og/artist?artistAddress=${artistAddress}`],
      },
      other: {
        "fc:frame": JSON.stringify({
          version: "next",
          imageUrl: `${IN_PROCESS_API}/og/artist?artistAddress=${artistAddress}`,
          aspectRatio: "3:2",
          button: {
            title: title,
            action: {
              type: "launch_frame",
              name: "In Process",
              url: `${SITE_ORIGINAL_URL}/${artistAddress}/collected`,
              iconImageUrl: `${IN_PROCESS_API}/og/artist?artistAddress=${artistAddress}`,
              splashImageUrl: `${SITE_ORIGINAL_URL}/desktop_footer_logo.png`,
              splashBackgroundColor: "#e9ccbb",
            },
          },
        }),
      },
    };
  } catch {
    const title = `${truncateAddress(artistAddress)} · Collected`;
    return {
      title,
      description: "Collected moments on In Process",
    };
  }
}

const Collected = async ({ params }: Props) => {
  const { artistAddress } = await params;
  const address = artistAddress.toLowerCase() as Address;
  const queryClient = getQueryClient();

  try {
    await prefetchCollectedProfilePage(queryClient, address);
  } catch {
    // Client hooks refetch if prefetch fails
  }

  return (
    <ProfileHydrationBoundary state={dehydrate(queryClient)}>
      <CollectedPage />
    </ProfileHydrationBoundary>
  );
};

export default Collected;
