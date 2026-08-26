import type { ImageGalleryItem } from "@/lib/faq/faqImages";
import { faqImageGalleries } from "@/lib/faq/faqImages";

export interface FaqItemGallery {
  images: ImageGalleryItem[];
  columns?: 2 | 3;
  shadow?: boolean;
  className?: string;
  captionClassName?: string;
}

const GETTING_STARTED_CAPTION =
  "font-spectral text-left font-medium tracking-tight text-[#1B1504] text-[14px] md:text-[20px] ml-6 md:ml-4";

/** Galleries shown inside an accordion item when that question is open. */
export const faqItemGalleries: Record<string, FaqItemGallery[]> = {
  "collective-timeline": [{ images: faqImageGalleries.timelineExamples }],
  "embeds-and-links": [{ images: faqImageGalleries.contentTypes }],
  telegram: [{ images: faqImageGalleries.telegramCommands, columns: 3 }],
  join: [
    {
      images: faqImageGalleries.gettingStarted.slice(0, 2),
      captionClassName: GETTING_STARTED_CAPTION,
    },
    {
      images: faqImageGalleries.gettingStarted.slice(2, 4),
      captionClassName: GETTING_STARTED_CAPTION,
    },
    {
      images: faqImageGalleries.gettingStarted.slice(4, 6),
      captionClassName: GETTING_STARTED_CAPTION,
    },
  ],
  "connect-wallet": [
    {
      images: faqImageGalleries.externalWallet,
      shadow: true,
      className: "lg:gap-16",
    },
  ],
};
