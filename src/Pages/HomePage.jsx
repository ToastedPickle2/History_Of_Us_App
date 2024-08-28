import Banner from "../components/Banner";
import Hero from "../components/Hero";
import NavBar from "../components/NavBar";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <div>
        <NavBar />
        <Hero />
        <Banner />
      </div>
    </>
  );
}
