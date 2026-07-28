import confetti from "canvas-confetti";

const fireCollectConfetti = () => {
  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.65 },
    colors: ["#C9835E", "#C9B37E", "#7FA588", "#8E93AD", "#A98CA5"],
  });
};

export default fireCollectConfetti;
