const AVATAR_COLORS = ["#C9835E", "#8E93AD", "#7FA588", "#A98CA5", "#C9B37E", "#7C6FBF"];

export const avatarColorFor = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash + seed.charCodeAt(i) * 17) % AVATAR_COLORS.length;
  }
  return AVATAR_COLORS[hash];
};
