import { useState } from "react";
import styles from "./Guide.module.css";

export default function GuideItem({ imgSrc, text, index }) {
  const [imgHover, setImgHover] = useState(false);

  const imgHoverStyle = {
    filter: "brightness(100%)",
    transform: "translateY(-2rem)",
    borderTop: "5px solid #72efdd",
  };

  const textHoverStyle = {
    backgroundColor: "lightblue",
    opacity: "100%",
    width: "50%",
    fontSize: "1.9rem",
  };
  return (
    <>
      <li
        className={`${styles.imgsWrapper} ${styles[`img${index + 1}Wrapper`]}`}
      >
        <img
          src={imgSrc}
          className={styles.imgs}
          style={imgHover ? imgHoverStyle : null}
          onMouseOver={() => setImgHover(true)}
          onMouseLeave={() => setImgHover(false)}
          alt=""
        />
        <p
          onMouseOver={() => setImgHover(true)}
          style={imgHover ? textHoverStyle : null}
        >
          {text}
        </p>{" "}
      </li>
    </>
  );
}
