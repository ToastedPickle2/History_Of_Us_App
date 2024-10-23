import { useEffect, useRef } from "react";
import TypeIt from "typeit-react";
import styles from "./PersonInfoCard.module.css";

export default function PersonInfoCard({ peopleInfo }) {
  const { city, country } = peopleInfo.location;
  const { age } = peopleInfo.dob;
  const { lifeEvents, occupation, hobbies, current } = peopleInfo.personalInfo;

  const lastThreeLetters = peopleInfo.name.last.split("").splice(-3).join("");

  console.log(lastThreeLetters);

  const reversedLetters = peopleInfo.name.last
    .split("")
    .slice(-2)
    .reverse()
    .join("");

  const lastName =
    peopleInfo.name.last
      .split("")
      .slice(0, peopleInfo.name.last.split("").length - 3)
      .join("") + reversedLetters;

  return (
    <div className={styles.personInfoContainer}>
      <div className={styles.personImgWrapper}>
        <img
          src={peopleInfo.picture.medium}
          className={styles.personImg}
          alt="Person"
        />
        {/* <TypeIt
          className={styles.personName}
          as={"h1"}
          options={{
            strings: [`${peopleInfo.name.first} ${peopleInfo.name.last}`],
            speed: 50,
            waitUntilVisible: true,
          }}
        /> */}
        <TypeIt
          className={styles.personName}
          as={"h1"}
          getBeforeInit={(instance) => {
            instance
              .type(`${peopleInfo.name.first} ${lastName}`)
              .pause(750)
              .delete(2)
              .pause(200)
              .type(`${lastThreeLetters}`);
            return instance;
          }}
        />
      </div>
      <ul className={styles.aboutWrapper}>
        <li>
          <b>Age:</b> {age}
        </li>
        <li>
          <b>From:</b> {city}, {country}
        </li>
        <li>
          <b>Life Events:</b> {lifeEvents}
        </li>
        <li>
          <b>Occupation:</b> {occupation}
        </li>
        <li>
          <b>Hobbies:</b> {hobbies}
        </li>
        <li>
          <b>Current:</b> {current}
        </li>
      </ul>
    </div>
  );
}
