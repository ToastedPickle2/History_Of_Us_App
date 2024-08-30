import React from "react";
import styles from "./IntroSection.module.css";
import img1 from "../assets/home-page-img2.jpg";

export default function IntroSection() {
  return (
    <div className={styles.introSectionContainer}>
      <div className={styles.firstSectionWrapper}>
        <p className={styles.firstMainText}>
          History of <b>Us</b> is a platform where you can create and share the
          stories of your life or the lives of loved ones. Capture{" "}
          <b>memories</b>, pass down <b>traditions</b>, and leave a{" "}
          <b>legacy</b> for future generations.
        </p>
        <div className={styles.firstImagesWrapper}>
          <span className={styles.filter}></span>
          <p>
            "Emma always had a knack for turning simple moments into
            extraordinary memories—her laughter was the soundtrack to our lives,
            and her wisdom guided us through the toughest times."
          </p>
          <img src={img1} alt="" />
        </div>
      </div>

      <div className={styles.secondSectionWrapper}>
        <p className={styles.secondMainText}>
          History of Us is not just for writing autobiographies and
          biographies—it's a place to explore and learn about the <b>lives</b>,
          <b> history</b>, and <b>cultures</b> of people from around the world.
        </p>
      </div>
    </div>
  );
}
