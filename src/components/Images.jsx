import styles from "./Images.module.css";

export default function Images({ picture }) {
  function getRandomHeight() {
    return `${Math.random() * (25 - 15) + 15}rem`;
  }
  return (
    <>
      <li className={styles.imgCard} style={{ height: getRandomHeight() }}>
        <img className={styles.img} src={picture} alt="" />
      </li>
    </>
  );
}
