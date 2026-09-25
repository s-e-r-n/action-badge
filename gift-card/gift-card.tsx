import type { StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { CardMotion } from "./card-motion";
import styles from "./gift-card.module.css";

export type GiftCardProps = {
  lead: string;
  title: string;
  titleTail?: { text: string; emoji?: string };
  price: string;
  formerPrice?: string;
  mark: StaticImageData;
  markLabel: string;
  giftLabel: string;
};

type SceneVariables = CSSProperties & Record<`--${string}`, string>;

const edgeLayers = [1, 2, 3, 4, 5, 6, 7, 8];

export const GiftCard = ({
  lead,
  title,
  titleTail,
  price,
  formerPrice,
  mark,
  markLabel,
  giftLabel,
}: GiftCardProps) => {
  const variables: SceneVariables = {
    "--gift-card-mark": `url("${mark.src}")`,
    "--gift-card-mark-ratio": `${mark.width} / ${mark.height}`,
  };

  return (
    <CardMotion style={variables}>
      <div className={styles.stage}>
        <div className={styles.tilt}>
          <div className={styles.card}>
            {edgeLayers.map((layer) => (
              <span key={layer} className={styles.edge} />
            ))}
            <div className={styles.face}>
              <div className={styles.print}>
                <span className={styles.gift} role="img" aria-label={giftLabel} />
                <p className={styles.lead}>{lead}</p>
                <p className={styles.title}>
                  {title}
                  {titleTail && (
                    <>
                      {" "}
                      <span className={styles.tail}>
                        {titleTail.text}
                        {titleTail.emoji && (
                          <>
                            {" "}
                            <span className={styles.emoji}>{titleTail.emoji}</span>
                          </>
                        )}
                      </span>
                    </>
                  )}
                </p>
                <span className={styles.mark} role="img" aria-label={markLabel} />
                <p className={styles.price}>
                  {formerPrice && (
                    <>
                      <s className={styles.former}>{formerPrice}</s>{" "}
                    </>
                  )}
                  {price}
                </p>
              </div>
              <span className={styles.light} />
            </div>
          </div>
        </div>
      </div>
    </CardMotion>
  );
};
