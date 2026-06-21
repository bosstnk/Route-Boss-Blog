import HeroSection from "@/features/post/components/HeroSection";
import ArticleSection from "@/features/post/components/ArticleSection";
import NavBar from "@/shared/components/navbar/NavBar"
import Footer from "@/shared/components/common/Footer";

function LandingPage() {
  return (
    <>
      <NavBar />
      <div className="bg-base-brown-100 overflow-hidden">
        <HeroSection />
        <ArticleSection />
      </div>
      <Footer/>
    </>
  );
}

export default LandingPage;
