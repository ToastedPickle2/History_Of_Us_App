import BackgroundPattern from "../components/BackgroundPattern";
import Banner from "../components/Banner";
import Hero from "../components/Hero";
import IntroSection from "../components/IntroSection";
import NavBar from "../components/NavBar";
import styles from "./HomePage.module.css";
import Guide from "../components/Guide";
import DiscoverSection from "../components/DiscoverSection";

export default function HomePage() {
  return (
    <>
      <div>
        <NavBar />
        <BackgroundPattern />
        <Hero />
        <IntroSection />
        <Banner />
        <Guide />
        <DiscoverSection />
      </div>
    </>
  );
}
