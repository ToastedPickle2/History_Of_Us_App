import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import logo from "../assets/logo.jpg";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mouseInNav, setMouseInNav] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 150) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleMouseEnter() {
    setMouseInNav(true);
  }

  function handleMouseLeave() {
    setMouseInNav(false);
  }

  return (
    <>
      {/* <div className={styles.navContainer}>Nav</div>; */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${styles.navBarContainer} ${
          scrolled && !mouseInNav ? styles.scrolled : ""
        }`}
      >
        <div className={styles.navLogoWrapper}>
          <a href="/">
            <img className={styles.navLogo} src={logo} alt="" />
          </a>
        </div>
        <div className={styles.navTitleWrapper}>
          <h1 className={styles.navTitle}>
            History of <b>Us</b>
          </h1>
        </div>
        <div className={styles.navContentWrapper}>
          <button className={styles.ctaBtn}>Get Started</button>
          <div>
            <button className={styles.loginBtn}>Login</button>
            <button className={styles.signupBtn}>Sign up</button>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
