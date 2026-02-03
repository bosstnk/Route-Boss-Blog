import HeroSection from "../components/HeroSection";
import ArticleSection from "../components/ArticleSection";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <>
      <NavBar />
      <div className="bg-base-brown-100">
        <HeroSection />
        <ArticleSection />
      </div>
      <Footer/>
    </>
  );
}

export default LandingPage;
