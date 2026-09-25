import { breathe } from "./breathe";
import { followPage } from "./follow-page";
import { createPose } from "./pose";

const hasFinePointer = () => matchMedia("(hover: hover) and (pointer: fine)").matches;

export const startCardMotion = (scene: HTMLElement) => {
  const pose = createPose(scene);
  const drive = hasFinePointer() ? followPage : breathe;
  const stopDriver = drive({ scene, pose });
  return () => {
    stopDriver();
    pose.dispose();
  };
};
