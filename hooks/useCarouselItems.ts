import { useQuery } from "@tanstack/react-query";
import { INSTAGRAM_CAROUSEL_MIME } from "@/lib/consts";
import { MomentMetadata } from "@/types/moment";
import { CarouselItem } from "@/lib/instagram/uploadCarouselSlide";

const fetchCarouselItems = async (uri: string): Promise<CarouselItem[]> => {
  const response = await fetch(uri);
  if (!response.ok) throw new Error("failed to load carousel content");
  return response.json();
};

export const useCarouselItems = (metadata?: MomentMetadata | null) => {
  const uri = metadata?.content?.mime === INSTAGRAM_CAROUSEL_MIME ? metadata.content.uri : "";

  const { data } = useQuery({
    queryKey: ["carousel_items", uri],
    queryFn: () => fetchCarouselItems(uri),
    staleTime: Infinity,
    enabled: !!uri,
  });

  return { items: data ?? [] };
};
