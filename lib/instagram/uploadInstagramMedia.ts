import { INSTAGRAM_CAROUSEL_MIME } from "@/lib/consts";
import { fetchLinkPreview } from "@/lib/link/fetchLinkPreview";
import { fetchLinkBlob } from "@/lib/link/fetchLinkBlob";
import { uploadToSupabase } from "@/lib/supabase/storage/uploadToSupabase";
import { uploadJson } from "@/lib/arweave/uploadJson";
import { uploadCarouselSlide } from "./uploadCarouselSlide";

export interface InstagramMediaContent {
  image: string;
  mime: string;
  uri: string;
}

// Fetches the Instagram post once at mint time (the one Apify call this
// costs) and re-hosts whatever media it has:
// - carousel (Sidecar) posts: every slide, assembled into a
//   {type,url,preview}[] manifest (content.mime = INSTAGRAM_CAROUSEL_MIME)
// - single image/video posts: just that one file, same as any other link mint
export const uploadInstagramMedia = async (
  postUrl: string
): Promise<InstagramMediaContent | null> => {
  const preview = await fetchLinkPreview(postUrl);

  if (preview.carouselItems?.length) {
    const items = await Promise.all(preview.carouselItems.map(uploadCarouselSlide));
    const { uri } = await uploadJson(items);
    return { image: items[0].preview, mime: INSTAGRAM_CAROUSEL_MIME, uri };
  }

  const imageUrl = preview.images?.[0];
  if (!imageUrl) return null;

  const file = await fetchLinkBlob(imageUrl);
  const uri = await uploadToSupabase(file);
  return { image: uri, mime: file.type, uri };
};
