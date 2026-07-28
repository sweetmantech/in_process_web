import confetti from "canvas-confetti";

const COLORS = ["#C9835E", "#C9B37E", "#7FA588", "#8E93AD", "#A98CA5"];
const DURATION_MS = 2500;

const fireCollectConfetti = () => {
  const end = Date.now() + DURATION_MS;

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 270,
      spread: 55,
      startVelocity: 25,
      gravity: 0.9,
      ticks: 200,
      origin: { x: Math.random(), y: -0.05 },
      colors: COLORS,
      zIndex: 9999,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  // Initial wider burst across the top so it feels full-screen right away.
  confetti({
    particleCount: 80,
    angle: 270,
    spread: 100,
    startVelocity: 35,
    gravity: 0.85,
    ticks: 220,
    origin: { x: 0.5, y: -0.05 },
    colors: COLORS,
    zIndex: 9999,
  });

  frame();
};

export default fireCollectConfetti;
