// import heroimg from "../assets/home-page-img1.jpg";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={styles.heroSectionContainer}>
      <span className={styles.filter}></span>
      {/* <img
        src={heroimg}
        alt="black and white image of a woman"
        className={styles.heroImage}
      /> */}
      <div className={styles.heroTextWrapper}>
        {/* <h1>
          Preserve and share the stories of your life and the lives of those you
          love, creating a history that lasts forever.
        </h1> */}
        <h1>
          Create autobiographies or biographies—because your story deserves to
          be remembered and shared with future generations.
        </h1>
        <h2>
          Preserve Your <b>Story</b>, Preserve Your <b>Legacy</b>
        </h2>
      </div>
      <div className={styles.heroBtnsWrapper}>
        <h3>Join the world's largest collection of life stories</h3>
        <div>
          <button>Start Your Story</button>
          <button>Explore Stories</button>
        </div>
      </div>
    </div>
  );
}
