import { INSTAGRAM_CAROUSEL_MIME } from "@/lib/consts";
import { fetchLinkPreview } from "@/lib/link/fetchLinkPreview";
import { uploadJson } from "@/lib/arweave/uploadJson";
import { uploadCarouselSlide, CarouselItem } from "./uploadCarouselSlide";

export interface InstagramCarouselContent {
  mime: string;
  uri: string;
  items: CarouselItem[];
}

// Only handles genuine carousel posts. A single-image/video Instagram post
// has no carouselItems and should go through the existing single-file
// content.mime/uri path instead — returns null here.
export const uploadInstagramCarousel = async (
  postUrl: string
): Promise<InstagramCarouselContent | null> => {
  const preview = await fetchLinkPreview(postUrl);
  if (!preview.carouselItems?.length) return null;

  const items = await Promise.all(preview.carouselItems.map(uploadCarouselSlide));
  const { uri } = await uploadJson(items);

  return { mime: INSTAGRAM_CAROUSEL_MIME, uri, items };
};
