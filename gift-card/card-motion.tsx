"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import styles from "./gift-card.module.css";
import { startCardMotion } from "./start-card-motion";

export const CardMotion = ({ style, children }: { style: CSSProperties; children: ReactNode }) => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    return startCardMotion(scene);
  }, []);

  return (
    <div ref={sceneRef} className={styles.scene} style={style}>
      {children}
    </div>
  );
};
