import React, { useState } from "react";
import styles from "./IntroSection.module.css";
import img1 from "../assets/home-page-img2.jpg";
import LearnMoreBtn from "./CtaBtn";

export default function IntroSection() {
  const [filterHover, setFilterHover] = useState(false);

  const filterHoverStyle = {
    opacity: "50%",
  };

  return (
    <div className={styles.introSectionContainer}>
      <div className={styles.firstSectionWrapper}>
        <div className={styles.firstMainText}>
          <p>
            History of <b>Us</b> is a platform where you can create and share
            the stories of your life or the lives of loved ones. Capture{" "}
            <b>memories</b>, pass down <b>traditions</b>, and leave a{" "}
            <b>legacy</b> for future generations.
          </p>
          <LearnMoreBtn className={styles.ctaBtn}>Create a Legacy</LearnMoreBtn>
        </div>
        <div className={styles.firstImagesWrapper}>
          <span
            className={styles.filter}
            style={filterHover ? filterHoverStyle : null}
            onMouseEnter={() => setFilterHover(true)}
            onMouseLeave={() => setFilterHover(false)}
          ></span>
          <p
            onMouseEnter={() => setFilterHover(true)}
            // style={!filterHover ? filterHoverStyle : null}
            className={`${filterHover ? styles.filterOn : styles.filterOff}`}
          >
            "Emma always had a knack for turning simple moments into
            extraordinary memories—her laughter was the soundtrack to our lives,
            and her wisdom guided us through the toughest times."
          </p>
          <img src={img1} alt="" />
        </div>
      </div>

      <div className={styles.secondSectionWrapper}>
        <div className={styles.secondMainText}>
          <p>
            History of Us is not just for writing autobiographies and
            biographies—it's a place to explore and learn about the <b>lives</b>
            ,<b> history</b>, and <b>cultures</b> of people from around the
            world.
          </p>
          <LearnMoreBtn>Discover Lives</LearnMoreBtn>
        </div>
      </div>
    </div>
  );
}
