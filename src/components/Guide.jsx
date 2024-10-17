import CtaBtn from "./CtaBtn";
import styles from "./Guide.module.css";
import step1 from "../assets/step1.jpg";
import step2 from "../assets/step2.jpg";
import step3 from "../assets/step3.jpg";
import step4 from "../assets/step4.jpg";
import step5 from "../assets/step5.jpg";
import GuideItem from "./GuideItem";

export default function Guide() {
  const steps = [
    { imgSrc: step1, text: "Step 1: Create an Account", img1: "img1" },
    { imgSrc: step2, text: "Step 2: Create Your Story", img2: "img2" },
    { imgSrc: step3, text: "Step 3: Write, Record, or Upload Memories" },
    { imgSrc: step4, text: "Step 4: Choose Who Can View Your Story" },
    { imgSrc: step5, text: "Step 5: Explore and Share" },
  ];

  return (
    <>
      <div className={styles.guideContainer}>
        <span className={styles.filter}></span>

        <h1 className={styles.h1}>How It Works</h1>
        <ul className={styles.guideStepsWrapper}>
          {steps.map((step, index) => (
            <GuideItem
              key={index}
              index={index}
              imgSrc={step.imgSrc}
              text={step.text}
            />
          ))}
        </ul>
        <div className={styles.centerLineTextContainer}>
          <div className={styles.centerAboutWrapper}>
            <div className={styles.centerAboutSticky}>
              <p className={styles.centerAbout}>
                <a href="#landing-page" className={styles.anchor}>
                  About
                </a>
              </p>
            </div>
          </div>

          <div className={styles.centerSkillsWrapper}>
            <div className={styles.centerSkillsSticky}>
              <p className={styles.centerSkills}>
                <a href="#skills-page" className={styles.anchor}>
                  Skills
                </a>
              </p>
            </div>
          </div>

          <div className={styles.centerProjectsWrapper}>
            <div className={styles.centerProjectsSticky}>
              <p className={styles.centerProjects}>
                <a href="#projects-page" className={styles.anchor}>
                  Projects
                </a>
              </p>
            </div>
          </div>

          <div className={styles.centerContactWrapper}>
            <div className={styles.centerContactSticky}>
              <p className={styles.centerContact}>
                <a href="#contact-page" className={styles.anchor}>
                  Contact
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.ctaBtnWrapper}>
          <CtaBtn className={styles.ctaBtn}>Get Started Now</CtaBtn>
        </div>
      </div>
    </>
  );
}
