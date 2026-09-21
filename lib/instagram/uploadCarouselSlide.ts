import { fetchLinkBlob } from "@/lib/link/fetchLinkBlob";
import { uploadToSupabase } from "@/lib/supabase/storage/uploadToSupabase";

export interface CarouselSlide {
  type?: string;
  displayUrl?: string;
  videoUrl?: string;
}

export interface CarouselItem {
  type: string;
  url: string;
  preview: string;
}

// Image slides: the image is its own preview (preview === url).
// Video slides: `url` is the re-hosted video file, `preview` is the
// re-hosted poster frame (the slide's displayUrl).
export const uploadCarouselSlide = async (slide: CarouselSlide): Promise<CarouselItem> => {
  if (!slide.displayUrl) {
    throw new Error("Carousel slide is missing displayUrl");
  }

  const previewFile = await fetchLinkBlob(slide.displayUrl);
  const previewUrl = await uploadToSupabase(previewFile);

  if (!slide.videoUrl) {
    return { type: previewFile.type, url: previewUrl, preview: previewUrl };
  }

  const mediaFile = await fetchLinkBlob(slide.videoUrl);
  const mediaUrl = await uploadToSupabase(mediaFile);
  return { type: mediaFile.type, url: mediaUrl, preview: previewUrl };
};
