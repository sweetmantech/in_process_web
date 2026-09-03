const PALETTE = ["#887bff", "#A8862F", "#7FD58A", "#4EA8DE", "#B3543F", "#34332F"];

const analyticsTableAvatarBg = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) % 997;
  }
  return PALETTE[hash % PALETTE.length];
};

export default analyticsTableAvatarBg;
