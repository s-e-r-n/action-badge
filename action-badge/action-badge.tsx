import type { StaticImageData } from "next/image";
import { Fragment, type CSSProperties } from "react";
import styles from "./action-badge.module.css";
import { BadgeMotion } from "./badge-motion";

export type ActionBadgeRun = { text: string; struck?: true };

export type ActionBadgeLine = {
  text: string | readonly [ActionBadgeRun, ...ActionBadgeRun[]];
  color: string;
};

export type ActionBadgeProps = {
  lines: readonly [ActionBadgeLine, ...ActionBadgeLine[]];
  icon: StaticImageData;
  background: string;
  sectionId: string;
  upright?: true;
  gildedIcon?: true;
};

const LineText = ({ text }: { text: ActionBadgeLine["text"] }) =>
  typeof text === "string"
    ? text
    : text.map((run, index) =>
        run.struck ? (
          <s key={index} className={styles.struck}>
            {run.text}
          </s>
        ) : (
          <Fragment key={index}>{run.text}</Fragment>
        ),
      );

type BadgeVariables = CSSProperties & Record<`--${string}`, string>;

export const ActionBadge = ({
  lines,
  icon,
  background,
  sectionId,
  upright,
  gildedIcon,
}: ActionBadgeProps) => {
  const variables: BadgeVariables = {
    "--action-badge-motif": `url("${icon.src}")`,
    "--action-badge-background": background,
  };
  const lineClassName = upright ? `${styles.line} ${styles.upright}` : styles.line;
  const motifClassName = gildedIcon ? `${styles.motif} ${styles.gilded}` : styles.motif;

  return (
    <BadgeMotion style={variables}>
      <div className={styles.tilt}>
        <a className={styles.face} href={`#${sectionId}`}>
          <div className={styles.foil}>
            <span className={motifClassName} />
          </div>
          <div className={styles.sheen} />
          <div className={styles.light} />
          <div className={styles.content}>
            <p className={styles.text}>
              {lines.map((line, index) => (
                <span key={index} className={lineClassName} style={{ color: line.color }}>
                  <LineText text={line.text} />
                </span>
              ))}
            </p>
          </div>
        </a>
      </div>
    </BadgeMotion>
  );
};
