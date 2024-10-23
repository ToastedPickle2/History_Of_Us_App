import { useEffect, useRef } from "react";
import { useScroll, motion, useSpring, useTransform } from "framer-motion";
import styles from "./PeopleBioSamples.module.css";
import Images from "./Images";
import PersonInfoCard from "./PersonInfoCard";

export default function PeopleBioSamples({ peopleInfo, setViewPeopleInfo }) {
  const timelineContainerRef = useRef(null); // Reference to the scroll container
  const timelineWrapperRef = useRef(null); // Reference to the large timeline wrapper

  console.log("LOOK", peopleInfo);

  useEffect(() => {
    function handleCloseBio(e) {
      if (e.key === "Escape") {
        setViewPeopleInfo(false);
      }
    }
    document.addEventListener("keydown", handleCloseBio);
    return () => {
      document.removeEventListener("keydown", handleCloseBio);
    };
  }, [setViewPeopleInfo]);

  // Set up scroll progress tracking
  const { scrollYProgress } = useScroll({
    container: timelineContainerRef, // Track the scrolling on the container
    target: timelineWrapperRef, // Track the full timeline width
    axis: "x", // Specify horizontal scrolling
  });

  // Smooth the scroll progress and change background color as scrolling happens
  const scaleX = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const background = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgb(232 197 174)", "rgb(99 74 58)"]
  );

  function test() {
    setViewPeopleInfo(false)
    console.log(peopleInfo)
  }

  return (
    <div className={styles.container}>
      <span alt="magical tree image" className={styles.backgroundImg} />

      <div className={styles.btnWrapper}>
        <button
          className={styles.closeBtn}
          onClick={() => setViewPeopleInfo(false)}
        >
          X
        </button>
      </div>
      <h1 className={styles.personName}>{peopleInfo.name.first}</h1>
      <div className={styles.peopleInfoContainer}>
        <PersonInfoCard peopleInfo={peopleInfo} />
      </div>
      <div
        className={styles.timelineContainer}
        ref={timelineContainerRef} // Reference for the scroll container
      >
        {/* <video autoplay muted loop className={styles.backgroundVideo}>
          <source
            src="https://cdn.pixabay.com/video/2024/03/12/203945-922675911_tiny.mp4"
            type="video/mp4"
          />
        </video> */}
        <div
          className={styles.timelineWrapper}
          ref={timelineWrapperRef} // Reference for the timeline wrapper
        >
          <ul className={styles.imagesContainer}>
            {peopleInfo.personalPictures?.map((picture) => (
              <Images picture={picture} key={picture} />
            ))}
          </ul>
        </div>
      </div>
      <motion.div
        className={styles.progressBar}
        style={{
          scaleX, // Link scrollXProgress to the width of the progress bar
          transformOrigin: "left",
          background,
          width: "100%",
          height: "1rem",
          position: "absolute",
          bottom: "0.1rem",
        }}
      />
    </div>
  );
}
