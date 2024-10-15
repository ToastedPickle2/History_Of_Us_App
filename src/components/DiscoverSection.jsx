import { useEffect, useState } from "react";
import styles from "./DiscoverSection.module.css";
import Map from "./Map";
import PeopleBioSamples from "./PeopleBioSamples";

const BASE_URL = "http://localhost:5000";

export default function DiscoverSection() {
  const [themeChoice, setThemeChoice] = useState("All");
  const [countryChoice, setCountryChoice] = useState("All");
  const [ageRange, setAgeRange] = useState("All");
  const [peopleData, setPeopleData] = useState([]);

  const [peopleInfo, setPeopleInfo] = useState();
  const [viewPeopleInfo, setViewPeopleInfo] = useState(false);

  let countriesCodes = [];

  const filterSelections = [themeChoice, countryChoice, ageRange];

  const themes = ["War Veterans", "Immigrant Stories", "Love & Family"];
  //   const countries = ["Mexico", "Thailand", "France", "Colombia"];
  const age = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"];

  console.log("LOOK", viewPeopleInfo);

  useEffect(() => {
    async function fetchPeopleApi() {
      try {
        const res = await fetch(`${BASE_URL}/peopleApi`);
        const data = await res.json();
        setPeopleData(data);
      } catch {
        throw new Error("Unable to access people data");
      }
    }
    fetchPeopleApi();
  }, []);

  peopleData.map((people) =>
    countriesCodes.push({ nat: people.nat, country: people.location.country })
  );

  function getCountryFlagEmojis() {
    return countriesCodes.map((countryObj) => {
      const { nat } = countryObj;

      if (!/^[A-Z]{2}$/.test(nat)) {
        return `Invalid country code: ${nat}`;
      }

      const codePoints = [...nat].map((char) => 127397 + char.charCodeAt());
      return String.fromCodePoint(...codePoints);
    });
  }

  const flags = getCountryFlagEmojis();

  console.log(countriesCodes);

  const countries = countriesCodes.map(
    (country, index) => `${country.nat} | ${country.country} ${flags[index]}`
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
                <option value="All">All</option>

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
                <option value="All">All</option>
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
          {viewPeopleInfo && (
            <PeopleBioSamples
              peopleInfo={peopleInfo}
              setViewPeopleInfo={setViewPeopleInfo}
            />
          )}
          {!viewPeopleInfo && (
            <Map
              filterSelections={filterSelections}
              setCountryChoice={setCountryChoice}
              setAgeRange={setAgeRange}
              setThemeChoice={setThemeChoice}
              setPeopleInfo={setPeopleInfo}
              setViewPeopleInfo={setViewPeopleInfo}
            />
          )}
        </div>
      </div>
    </>
  );
}
