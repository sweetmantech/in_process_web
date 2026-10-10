const toCssAspectRatio = (aspectRatio: string | null | undefined): string | undefined => {
  const match = aspectRatio?.match(/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?)$/);
  if (!match) return undefined;
  const [, width, height] = match;
  if (Number(width) <= 0 || Number(height) <= 0) return undefined;
  return `${width} / ${height}`;
};

export default toCssAspectRatio;
