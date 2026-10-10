const getMuxThumbnailUrl = (playbackId: string, width: number): string =>
  `https://image.mux.com/${playbackId}/thumbnail.webp?width=${width}`;

export default getMuxThumbnailUrl;
