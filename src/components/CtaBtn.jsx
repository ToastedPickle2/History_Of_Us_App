import styles from "./CtaBtn.module.css";

export default function LearnMoreBtn({ className, children }) {
  return (
    <button className={`${styles.btn} ${className || ""}`}>{children}</button>
  );
}
