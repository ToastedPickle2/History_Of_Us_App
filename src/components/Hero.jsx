import heroimg from "../assets/home-page-img1.jpg";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={styles.heroSectionContainer}>
      <img
        src={heroimg}
        alt="black and white image of a woman"
        className={styles.heroImage}
      />
      <div className={styles.heroTextWrapper}>
        <h1>Preserve Your Story, Preserve Your Legacy</h1>
        <h2>Join the world's largest collection of life stories</h2>
      </div>
      <div className={styles.heroBtnsWrapper}>
        <button>Start Your Story</button>
        <button>Explore Stories</button>
      </div>
    </div>
  );
}
