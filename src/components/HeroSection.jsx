import PictureProfile from "@/assets/images/picture-profile.jpg"

function HeroSection() {
  return (
    <div className="w-full px-4 py-10 flex flex-col items-center gap-10 xl:max-w-[1200px] xl:flex-row xl:gap-[3.75rem] xl:mx-auto xl:p-0">
      <div className="w-full max-w-[343px] flex flex-col gap-4 xl:max-w-[347px] xl:gap-6">
        {/* xl:text-headline-1 ไม่ทำงาน */}
        <h1 className="text-headline-2 text-center leading-12 text-base-brown-600 xl:text-headline-1 xl:text-right xl:leading-[60px]">Stay Informed, Stay Inspired</h1>
        <p className="text-body-1 text-center text-base-brown-400 leading-6 xl:text-right">
          Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
          Inspiration and Information.
        </p>
      </div>
      <div className="w-[343px] h-[470px] xl:w-full xl:h-[529px] overflow-hidden rounded-2xl">
        <img
          src={PictureProfile}
          alt="picture-profile"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full max-w-[343px] flex flex-col gap-3 xl:max-w-[347px]">
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
