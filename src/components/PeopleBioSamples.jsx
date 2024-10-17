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

  const milestones = [
    { label: "Birth", year: 1990, icon: "👶" },
    { label: "Graduation", year: 2010, icon: "🎓" },
    { label: "First Job", year: 2012, icon: "💼" },
    { label: "Marriage", year: 2015, icon: "💍" },
    { label: "First House", year: 2018, icon: "🏡" },
  ];

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

  return (
    <div className={styles.container}>
      <div className={styles.btnWrapper}>
        <button
          className={styles.closeBtn}
          onClick={() => setViewPeopleInfo(false)}
        >
          X
        </button>
      </div>
      <h1 className={styles.personName}>{peopleInfo.name.first}</h1>
      <div className={styles.test}>
        <PersonInfoCard peopleInfo={peopleInfo} />
      </div>
      <div
        className={styles.timelineContainer}
        ref={timelineContainerRef} // Reference for the scroll container
      >
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

// function Branch({ label, year, icon }) {
//   return (
//     <div className={styles.branch}>
//       <span className={styles.branchLabel}>
//         {icon} {label} - {year}
//       </span>
//     </div>
//   );
// }
