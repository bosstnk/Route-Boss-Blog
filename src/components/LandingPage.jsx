import HeroSection from "./HeroSection"
import ArticleSection from "./ArticleSection";

function LandingPage () {
    return (
        <div className="w-full lg:px-[7.5rem] lg:py-[3.75rem] bg-base-brown-100 flex flex-col lg:gap-20">
            <HeroSection />
            <ArticleSection/>
        </div>
    );
}

export default LandingPage;