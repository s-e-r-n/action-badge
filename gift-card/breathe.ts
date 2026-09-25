import type { Pose } from "./pose";

const swayPeriodXMs = 7000;
const swayPeriodYMs = 10500;

export const breathe = ({ scene, pose }: { scene: HTMLElement; pose: Pose }) => {
  let frame = 0;

  const sway = (time: number) => {
    pose.aim({
      x: Math.sin((time / swayPeriodXMs) * 2 * Math.PI) * 0.75,
      y: Math.sin((time / swayPeriodYMs) * 2 * Math.PI + 1) * 0.6,
    });
    frame = requestAnimationFrame(sway);
  };

  const pause = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  const resume = () => {
    if (!frame) frame = requestAnimationFrame(sway);
  };

  const watcher = new IntersectionObserver(([entry]) =>
    entry?.isIntersecting ? resume() : pause(),
  );
  watcher.observe(scene);

  return () => {
    watcher.disconnect();
    pause();
  };
};
