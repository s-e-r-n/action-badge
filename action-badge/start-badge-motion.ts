import { breathe } from "./breathe";
import { followPage } from "./follow-page";
import { createPose } from "./pose";

const hasFinePointer = () => matchMedia("(hover: hover) and (pointer: fine)").matches;

export const startBadgeMotion = (badge: HTMLElement) => {
  const pose = createPose(badge);
  const drive = hasFinePointer() ? followPage : breathe;
  const stopDriver = drive({ badge, pose });
  return () => {
    stopDriver();
    pose.dispose();
  };
};
