import { useState } from "react";
import styles from "./DiscoverSection.module.css";
import Map from "./Map";

export default function DiscoverSection() {
  const [themeChoice, setThemeChoice] = useState();
  const [countryChoice, setCountryChoice] = useState();
  const [ageRange, setAgeRange] = useState();

  const themes = ["War Veterans", "Immigrant Stories", "Love & Family"];
  //   const countries = ["Mexico", "Thailand", "France", "Colombia"];
  const countriesCodes = ["US", "GB", "CA", "FR"];
  const age = [
    "Under 15",
    "15-24",
    "25-34",
    "35-44",
    "45-54",
    "55-64",
    "65 and over",
  ];

  function getCountryFlagEmojis() {
    return countriesCodes.map((countryCode) => {
      // Ensure the input is two uppercase letters
      if (!/^[A-Z]{2}$/.test(countryCode)) {
        return `Invalid country code: ${countryCode}`;
      }

      const codePoints = [...countryCode].map(
        (char) => 127397 + char.charCodeAt()
      );
      return String.fromCodePoint(...codePoints);
    });
  }

  const flags = getCountryFlagEmojis();

  const countries = countriesCodes.map(
    (country, index) => `${country} ${flags[index]}`
  );

  console.log(countries);

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.h1}>Discover</h1>
        <h2 className={styles.h2}>Featured Stories</h2>
        <div className={styles.filtersContainer}>
          <p>Filters</p>
          <div className={styles.filtersWrapper}>
            <div>
              <p>Theme</p>
              <select
                value={themeChoice}
                onChange={(e) => setThemeChoice(e.target.value)}
              >
                {themes.map((option, i) => (
                  <option value={option} key={i}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p>Country</p>
              <select
                value={countryChoice}
                onChange={(e) => setCountryChoice(e.target.value)}
              >
                <option value="All">All</option>
                {countries.map((option, i) => (
                  <option value={option} key={i}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p>Age</p>
              <select
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
              >
                {age.map((option, i) => (
                  <option value={option} key={i}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className={styles.sampleBiosContainer}>
          <Map />
        </div>
      </div>
    </>
  );
}
