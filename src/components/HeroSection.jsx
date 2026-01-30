import imageProfile from "@/assets/images/picture-profile.jpg"

function HeroSection() {
  return (
    <div className="px-4 py-10 flex flex-col items-center gap-10 lg:max-w-[1200px] lg:flex-row lg:gap-[60px] lg:mx-auto lg:p-0">
      <div className="flex flex-col gap-4 lg:gap-6 lg:max-w-[347px]">
        <h2 className="text-headline-2 text-center leading-12 text-base-brown-600 lg:text-headline-1 lg:leading-[60px] lg:text-right">Stay Informed, Stay Inspired</h2>
        <p className="text-body-1 text-center text-base-brown-400 lg:text-right">
          Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
          Inspiration and Information.
        </p>
      </div>
      <div className="w-[343px] h-[470px] lg:w-[386px] lg:h-[529px] overflow-hidden rounded-2xl">
        <img
          src={imageProfile}
          alt="picture-profile"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 lg:max-w-[347px]">
        <p className="text-body-3 text-base-brown-400 leading-5">-Author</p>
        <p className="text-headline-3 text-base-brown-500 leading-8">Thompson P.</p>
        <p className="text-body-1 text-base-brown-400 mt-2">
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
