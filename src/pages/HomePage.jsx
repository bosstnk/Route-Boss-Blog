import HeroSection from "../components/HeroSection";
import ArticleSection from "../components/ArticleSection";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <>
      <NavBar />
      <div className="w-full lg:px-[120px] lg:py-[60px] bg-base-brown-100 flex flex-col lg:gap-20">
        <HeroSection />
        <ArticleSection />
      </div>
      <Footer/>
    </>
  );
}

export default LandingPage;
