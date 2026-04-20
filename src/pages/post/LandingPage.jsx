import HeroSection from "@/components/home/HeroSection";
import ArticleSection from "@/components/home/ArticleSection";
import NavBar from "@/components/navbar/NavBar"
import Footer from "@/components/Footer";

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
