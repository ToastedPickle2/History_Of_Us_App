import styles from "./PersonInfoCard.module.css";

export default function PersonInfoCard({ peopleInfo }) {
  const { city } = peopleInfo.location;
  const { country } = peopleInfo.location;
  const { age } = peopleInfo.dob;

  const { lifeEvents } = peopleInfo.personalInfo;
  const { occupation } = peopleInfo.personalInfo;
  const { hobbies } = peopleInfo.personalInfo;
  const { current } = peopleInfo.personalInfo;

  return (
    <div className={styles.personInfoContainer}>
      <img
        src={peopleInfo.picture.medium}
        className={styles.personImg}
        alt=""
      />
      <ul className={styles.aboutWrapper}>
        <li>
          <b>Name:</b> {peopleInfo.name.first} {peopleInfo.name.last}
        </li>
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
      {/* Hi, my name is {peopleInfo.name.first}. I am from {city} in {country} */}
    </div>
  );
}
