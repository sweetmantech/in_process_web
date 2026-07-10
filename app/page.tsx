import { SITE_ORIGINAL_URL } from "@/lib/consts";
import { Metadata } from "next";
import { TimelineProvider } from "@/providers/TimelineProvider";
import HomePage from "@/components/HomePage";

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

const Home = () => {
  return (
    <TimelineProvider>
      <HomePage />
    </TimelineProvider>
  );
};

export default Home;
