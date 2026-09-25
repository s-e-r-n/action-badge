import type { Aim, Pose } from "./pose";

const nearReach = 2.5;
const farStrength = 0.5;

const aimToward = (badge: HTMLElement, clientX: number, clientY: number): Aim => {
  const box = badge.getBoundingClientRect();
  const radius = box.width / 2;
  const offsetX = (clientX - (box.left + radius)) / radius;
  const offsetY = (clientY - (box.top + box.height / 2)) / radius;
  const distance = Math.hypot(offsetX, offsetY);
  if (distance <= 1) return { x: offsetX, y: offsetY };
  const strength = Math.max(farStrength, Math.min(1, nearReach / distance));
  return { x: (offsetX / distance) * strength, y: (offsetY / distance) * strength };
};

export const followPage = ({ badge, pose }: { badge: HTMLElement; pose: Pose }) => {
  const surface = document.documentElement;
  const onMove = (event: PointerEvent) => pose.aim(aimToward(badge, event.clientX, event.clientY));
  const onLeave = () => pose.release();
  surface.addEventListener("pointermove", onMove);
  surface.addEventListener("pointerleave", onLeave);
  return () => {
    surface.removeEventListener("pointermove", onMove);
    surface.removeEventListener("pointerleave", onLeave);
  };
};
