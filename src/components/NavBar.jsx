import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <>
      {/* <div className={styles.navContainer}>Nav</div>; */}
      <div
        className={`${styles.navBarContainer} ${
          scrolled ? styles.scrolled : ""
        }`}
      >
        <p>Nav</p>
      </div>
      ;
    </>
  );
}
