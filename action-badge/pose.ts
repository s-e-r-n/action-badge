export type Aim = { x: number; y: number };

export type Pose = {
  aim: (point: Aim) => void;
  release: () => void;
  dispose: () => void;
};

const restingAim: Aim = { x: -0.35, y: -0.45 };
const settleTimeMs = 110;
const settledGap = 0.002;

const clampUnit = (value: number) => Math.max(-1, Math.min(1, value));

export const createPose = (badge: HTMLElement): Pose => {
  const current = { ...restingAim };
  let target = { ...restingAim };
  let frame = 0;
  let lastTime = 0;

  const paint = () => {
    badge.style.setProperty("--action-badge-aim-x", current.x.toFixed(4));
    badge.style.setProperty("--action-badge-aim-y", current.y.toFixed(4));
  };

  const step = (time: number) => {
    const elapsed = lastTime ? time - lastTime : 16;
    lastTime = time;
    const pull = 1 - Math.exp(-elapsed / settleTimeMs);
    current.x += (target.x - current.x) * pull;
    current.y += (target.y - current.y) * pull;
    paint();
    const settled =
      Math.abs(target.x - current.x) < settledGap &&
      Math.abs(target.y - current.y) < settledGap;
    frame = settled ? 0 : requestAnimationFrame(step);
    if (settled) lastTime = 0;
  };

  const wake = () => {
    if (!frame) frame = requestAnimationFrame(step);
  };

  const aim = (point: Aim) => {
    target = { x: clampUnit(point.x), y: clampUnit(point.y) };
    wake();
  };

  const release = () => aim(restingAim);

  const dispose = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  paint();
  return { aim, release, dispose };
};
