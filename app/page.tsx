import { SITE_ORIGINAL_URL } from "@/lib/consts";
import { Metadata } from "next";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { TimelineProvider } from "@/providers/TimelineProvider";
import HomePage from "@/components/HomePage";
import { getQueryClient } from "@/lib/react-query/getQueryClient";
import { prefetchHomeTimeline } from "@/lib/react-query/prefetchHomeTimeline";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "In Process",
  description: "A Collective Onchain Timeline for artists",
  openGraph: {
    title: "In Process",
    description: "A Collective Onchain Timeline for artists",
    images: [`${SITE_ORIGINAL_URL}/site_preview.png`],
  },
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "In Process",
      imageUrl: `${SITE_ORIGINAL_URL}/site_preview.png`,
      aspectRatio: "1:1",
      button: {
        title: "Open",
        action: {
          type: "launch_frame",
          name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "In Process",
          url: SITE_ORIGINAL_URL,
          splashImageUrl: `${SITE_ORIGINAL_URL}/site_preview.png`,
          splashBackgroundColor: "#e4e0db",
        },
      },
    }),
  },
};

const Home = async () => {
  const queryClient = getQueryClient();

  await prefetchHomeTimeline(queryClient).catch(() => null);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TimelineProvider>
        <HomePage />
      </TimelineProvider>
    </HydrationBoundary>
  );
};

export default Home;
