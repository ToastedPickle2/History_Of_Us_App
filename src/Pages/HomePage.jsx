import BackgroundPattern from "../components/BackgroundPattern";
import Banner from "../components/Banner";
import Hero from "../components/Hero";
import IntroSection from "../components/IntroSection";
import NavBar from "../components/NavBar";
import Guide from "../components/Guide";
import DiscoverSection from "../components/DiscoverSection";
import Footer from "../components/Footer";

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
        <Footer />
      </div>
    </>
  );
}
