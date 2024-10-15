import styles from "./Footer.module.css";
import logo from "../assets/logo.jpg";
import socialIcon1 from "../assets/facebook-icon.png";
import socialIcon2 from "../assets/instagram-icon.png";
import socialIcon3 from "../assets/tiktok-icon.png";

export default function Footer() {
  return (
    <>
      <footer>
        <div className={styles.footerContainer}>
          <div className={styles.footerSection}>
            <img src={logo} alt="history of us logo" className={styles.img} />
          </div>
          <div className={styles.footerSection}>
            <h2 className={styles.footerLogo}>History of Us</h2>
            <p className={styles.footerDescription}>
              Share the stories of your life or the lives of others to preserve
              human history. Together, we are building the largest collection of
              personal stories ever assembled.
            </p>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Quick Links</h3>
            <ul className={styles.footerLinks}>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/how-it-works">How It Works</a>
              </li>
              <li>
                <a href="/faq">FAQ</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms">Terms &amp; Conditions</a>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Follow Us</h3>
            <div className={styles.footerSocials}>
              <a href="https://www.facebook.com">
                <img src={socialIcon1} alt="facebook logo" />
              </a>
              <a href="https://www.instagram.com">
                <img src={socialIcon2} alt="instagram logo" />
              </a>
              <a href="https://www.tiktok.com">
                <img src={socialIcon3} alt="tik tok logo" />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2024 History of Us. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}
