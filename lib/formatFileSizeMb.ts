const formatFileSizeMb = (fileSizeBytes: number): string => {
  return (fileSizeBytes / (1024 * 1024)).toFixed(2);
};

export default formatFileSizeMb;
