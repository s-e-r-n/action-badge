import type { Pose } from "./pose";

const swayPeriodXMs = 7000;
const swayPeriodYMs = 10500;

export const breathe = ({ pose }: { pose: Pose }) => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  let frame = 0;

  const sway = (time: number) => {
    pose.aim({
      x: Math.sin((time / swayPeriodXMs) * 2 * Math.PI) * 0.75,
      y: Math.sin((time / swayPeriodYMs) * 2 * Math.PI + 1) * 0.6,
    });
    frame = requestAnimationFrame(sway);
  };

  frame = requestAnimationFrame(sway);

  return () => cancelAnimationFrame(frame);
};
