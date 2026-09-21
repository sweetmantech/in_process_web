export interface LinkPreview {
  siteName: string;
  title: string;
  description: string;
  url: string;
  images: string[];
  favicons: string[];
  /** Carousel slides (e.g. Instagram Sidecar posts) — each slide's raw media URLs. */
  carouselItems?: { type?: string; displayUrl?: string; videoUrl?: string }[];
}
