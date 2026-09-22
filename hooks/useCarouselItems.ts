import { useQuery } from "@tanstack/react-query";
import { INSTAGRAM_CAROUSEL_MIME } from "@/lib/consts";
import { MomentMetadata } from "@/types/moment";
import { CarouselItem } from "@/lib/instagram/uploadCarouselSlide";
import useArweaveUrl from "@/hooks/useArweaveUrl";

const fetchCarouselItems = async (url: string): Promise<CarouselItem[]> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("failed to load carousel content");
  return response.json();
};

export const useCarouselItems = (metadata?: MomentMetadata | null) => {
  const rawUri = metadata?.content?.mime === INSTAGRAM_CAROUSEL_MIME ? metadata.content.uri : "";
  // content.uri is an ar:// URI; resolve it to a fetchable gateway URL the
  // same way useMediaContent does, instead of fetching the raw scheme.
  const { url } = useArweaveUrl(rawUri);

  const { data } = useQuery({
    queryKey: ["carousel_items", url],
    queryFn: () => fetchCarouselItems(url as string),
    staleTime: Infinity,
    enabled: !!url,
  });

  return { items: data ?? [] };
};
