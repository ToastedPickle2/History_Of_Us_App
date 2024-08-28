import { useEffect, useState } from "react";
import styles from "./Banner.module.css";
import img1 from "../assets/person-img1.jpg";

export default function Banner() {
  const getRandomColor = () => {
    // Function to generate a bright, high-saturation color
    const randomChannel = () => Math.floor(Math.random() * 156) + 100; // Range from 100 to 255

    const red = randomChannel();
    const green = randomChannel();
    const blue = randomChannel();

    return `rgb(${red}, ${green}, ${blue})`;
  };

  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [job, setJob] = useState("");
  const [delta, setDelta] = useState(100 - Math.random() * 50);
  const [index, setIndex] = useState(1);
  const [bgColor, setBgColor] = useState(getRandomColor());
  const [fonts, setFonts] = useState("");

  const toRotate = [
    "a Teacher",
    "a Lawyer",
    "a Web Developer",
    "a Stay at Home Mom",
    "an Engineer",
    "a Designer",
    "a Data Scientist",
    "a Chef",
    "a Writer",
  ];
  const period = 2000;

  const listNames = [
    "Sarah",
    "Alex",
    "Anna",
    "Jose",
    "Michael",
    "Emily",
    "Daniel",
    "David",
    "Sophia",
  ];
  const coolFonts = [
    "Arial, sans-serif",
    "Verdana, sans-serif",
    "Tahoma, sans-serif",
    "Trebuchet MS, sans-serif",
    "Georgia, serif",
    "Times New Roman, serif",
    "Courier New, monospace",
    "Lucida Console, monospace",
    "Comic Sans MS, cursive",
    "Impact, sans-serif",
  ];

  const [name, setName] = useState("Joe");

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [job]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, job.length - 1)
      : fullText.substring(0, job.length + 1);

    setJob(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 3);
    } else {
      setDelta(100);
    }

    if (!isDeleting && updatedText === fullText) {
      //   setFonts(coolFonts[i]);
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setFonts(coolFonts[i]);
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(150);
      setName(listNames[i]);
      setBgColor(getRandomColor());
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <>
      <div className={styles.bannerContainer}>
        <img className={styles.bannerImages} src={img1} alt="" />
        <h1 className={styles.bannerTextWrapper}>
          Meet{" "}
          <span className={styles.nameStyle} style={{ color: bgColor }}>
            {name}
          </span>
          ,<br /> <span style={{ fontFamily: fonts }}>{job}</span>
        </h1>
      </div>
      <div className={styles.test}></div>
    </>
  );
}
