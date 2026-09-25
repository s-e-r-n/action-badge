"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import styles from "./action-badge.module.css";
import { startBadgeMotion } from "./start-badge-motion";

export const BadgeMotion = ({ style, children }: { style: CSSProperties; children: ReactNode }) => {
  const badgeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const badge = badgeRef.current;
    if (!badge) return;
    return startBadgeMotion(badge);
  }, []);

  return (
    <aside ref={badgeRef} className={styles.badge} style={style}>
      {children}
    </aside>
  );
};
