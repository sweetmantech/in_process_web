import { useMediaQuery } from "usehooks-ts";

const mediaQueryOptions = { defaultValue: false, initializeWithValue: false };

export const useMasonryColumnCount = () => {
  const is3xl = useMediaQuery("(min-width: 1920px)", mediaQueryOptions);
  const is2xl = useMediaQuery("(min-width: 1536px)", mediaQueryOptions);
  const isXl = useMediaQuery("(min-width: 1280px)", mediaQueryOptions);
  const isLg = useMediaQuery("(min-width: 1024px)", mediaQueryOptions);
  const isSm = useMediaQuery("(min-width: 640px)", mediaQueryOptions);

  if (is3xl) return 6;
  if (is2xl) return 5;
  if (isXl) return 4;
  if (isLg) return 3;
  if (isSm) return 2;
  return 1;
};
