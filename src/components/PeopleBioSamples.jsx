import { useEffect, useRef } from "react";
import { useScroll, motion, useSpring, useTransform } from "framer-motion";
import styles from "./PeopleBioSamples.module.css";

export default function PeopleBioSamples({ peopleInfo, setViewPeopleInfo }) {
  const timelineContainerRef = useRef(null); // Reference to the scroll container
  const timelineWrapperRef = useRef(null); // Reference to the large timeline wrapper

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
  const { scrollXProgress } = useScroll({
    container: timelineContainerRef, // Track the scrolling on the container
    target: timelineWrapperRef, // Track the full timeline width
    axis: "x", // Specify horizontal scrolling
  });

  // Smooth the scroll progress and change background color as scrolling happens
  const scaleX = useSpring(scrollXProgress, { stiffness: 50, damping: 20 });
  const background = useTransform(
    scrollXProgress,
    [0, 1],
    ["rgb(86, 1, 245)", "rgb(1, 245, 13)"]
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
      <h1>{peopleInfo.name.first}</h1>
      <div
        className={styles.timelineContainer}
        ref={timelineContainerRef} // Reference for the scroll container
      >
        <div
          className={styles.timelineWrapper}
          ref={timelineWrapperRef} // Reference for the timeline wrapper
        >
          <span className={styles.timelineLine}>-</span>
        </div>
      </div>
      <motion.div
        className={styles.progressBar}
        style={{
          scaleX, // Link scrollXProgress to the width of the progress bar
          transformOrigin: "left",
          background,
          width: "100%",
          height: "1.5rem",
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
