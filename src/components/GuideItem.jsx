import { useState } from "react";
import styles from "./Guide.module.css";

export default function GuideItem({ imgSrc, text, index }) {
  const [imgHover, setImgHover] = useState(false);

  function handleImgHover() {
    setImgHover(true);
  }

  const imgHoverStyle = {
    filter: "brightness(100%)",
    transform: "translateY(-2rem)",
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
          onMouseOver={handleImgHover}
          onMouseLeave={() => setImgHover(false)}
          alt=""
        />
        <p
          onMouseOver={handleImgHover}
          style={imgHover ? textHoverStyle : null}
        >
          {text}
        </p>{" "}
      </li>
      {/* <li key={text}>
        <img
          src={imgSrc}
          className={styles.img}
          onMouseOver={handleImgHover}
          onMouseLeave={() => setImgHover(false)}
          style={imgHover ? imgHoverStyle : null}
          alt=""
        />
        <p
          onMouseOver={handleImgHover}
          style={imgHover ? textHoverStyle : null}
        >
          {text}
        </p>
      </li> */}
    </>
  );
}
