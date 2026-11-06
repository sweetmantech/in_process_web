import { Metadata } from "next";
import { notFound } from "next/navigation";
import { dehydrate } from "@tanstack/react-query";
import ArtistPage from "@/components/ArtistPage";
import ProfileHydrationBoundary from "@/components/Profile/ProfileHydrationBoundary";
import { SITE_ORIGINAL_URL, IN_PROCESS_API } from "@/lib/consts";
import truncateAddress from "@/lib/utils/truncateAddress";
import { getArtistProfile } from "@/lib/artists/getArtistProfile";
import resolveArtistParam from "@/lib/artists/resolveArtistParam";
import { getQueryClient } from "@/lib/react-query/getQueryClient";
import { prefetchArtistProfilePage } from "@/lib/react-query/prefetchArtistProfilePage";

type Props = {
  params: Promise<{ artistAddress: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { artistAddress } = await params;
  const resolved = await resolveArtistParam(artistAddress);
  if (!resolved) notFound();
  const { address, handle } = resolved;

  try {
    const profile = await getArtistProfile(address);
    const title = profile?.username || truncateAddress(address);
    const description = profile?.bio || "Imagined by LATASHÁ";

    return {
      title: title,
      description: description,
      openGraph: {
        title: title,
        description: description,
        images: [`${IN_PROCESS_API}/og/artist?artistAddress=${address}`],
      },
      other: {
        "fc:frame": JSON.stringify({
          version: "next",
          imageUrl: `${IN_PROCESS_API}/og/artist?artistAddress=${address}`,
          aspectRatio: "3:2",
          button: {
            title: title,
            action: {
              type: "launch_frame",
              name: "In Process",
              url: `${SITE_ORIGINAL_URL}/${handle ?? address}`,
              iconImageUrl: `${IN_PROCESS_API}/og/artist?artistAddress=${address}`,
              splashImageUrl: `${SITE_ORIGINAL_URL}/desktop_footer_logo.png`,
              splashBackgroundColor: "#e9ccbb",
            },
          },
        }),
      },
    };
  } catch {
    const title = truncateAddress(address);
    return {
      title: title,
      description: "Imagined by LATASHÁ",
    };
  }
}

const Artist = async ({ params }: Props) => {
  const { artistAddress } = await params;
  const resolved = await resolveArtistParam(artistAddress);
  if (!resolved) notFound();
  const { address } = resolved;
  const queryClient = getQueryClient();

  try {
    await prefetchArtistProfilePage(queryClient, address);
  } catch {
    // Client hooks refetch if prefetch fails
  }

  return (
    <ProfileHydrationBoundary state={dehydrate(queryClient)}>
      <ArtistPage address={address} />
    </ProfileHydrationBoundary>
  );
};

export default Artist;
