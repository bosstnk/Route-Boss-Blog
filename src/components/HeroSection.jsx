import PictureProfile from "@/assets/images/picture-profile.jpg"

function HeroSection() {
  return (
    <div className="w-full max-w-[1200px] flex flex-row items-center gap-[3.75rem] mx-auto">
      <div className="w-full max-w-[347px] flex flex-col gap-6">
        <h1 className="text-headline-1 text-base-brown-600 text-right leading-[60px]">Stay Informed, Stay Inspired</h1>
        <p className="text-body-1 text-base-brown-400 text-right leading-6">
          Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
          Inspiration and Information.
        </p>
      </div>
      <div className="w-full h-[529px] overflow-hidden rounded-2xl">
        <img
          src={PictureProfile}
          alt="picture-profile"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full max-w-[347px] flex flex-col gap-3">
        <div className="w-full flex flex-col gap-1">
          <p className="text-body-3 text-base-brown-400 leading-5">-Author</p>
          <p className="text-headline-3 text-base-brown-500 leading-8">Thompson P.</p>
        </div>
        <p className="text-body-1 text-base-brown-400">
          I am a pet enthusiast and freelance writer who specializes in animal
          behavior and care. With a deep love for cats, I enjoy sharing insights
          on feline companionship and wellness. 
          <br /><br />
          When i’m not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes.
        </p>
      </div>
    </div>
  );
}

export default HeroSection;
