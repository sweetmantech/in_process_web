const DEPRECATED_DOMAINS = ["catalog.works", "sound.xyz"];

export const isDeprecatedUrl = (url: string): boolean =>
  DEPRECATED_DOMAINS.some((domain) => url.includes(domain));
