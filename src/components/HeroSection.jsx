import imageProfile from "@/assets/images/picture-profile.jpg";

function HeroSection() {
  return (
    <section
      className="
        px-4 py-10
        flex flex-col items-center gap-10
        lg:max-w-[1440px] lg:mx-auto
        lg:flex-row lg:gap-[60px]
        lg:px-[120px] lg:pt-[60px] lg:pb-[80px]
      "
    >
      {/* LEFT : Intro Text */}
      <div
        className="
          flex flex-col gap-4
          text-center
          lg:gap-6 lg:max-w-[347px] lg:text-right
        "
      >
        <h2
          className="
            text-headline-2 leading-12 text-base-brown-600
            lg:text-headline-1 lg:leading-[60px]
          "
        >
          Stay Informed, Stay Inspired
        </h2>

        <p className="text-body-1 text-base-brown-400">
          Discover a World of Knowledge at Your Fingertips.
          Your Daily Dose of Inspiration and Information.
        </p>
      </div>

      {/* CENTER : Image */}
      <div
        className="
          w-[343px] h-[470px]
          overflow-hidden rounded-2xl
          lg:w-[386px] lg:h-[529px]
        "
      >
        <img
          src={imageProfile}
          alt="Author profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT : Author Info */}
      <div
        className="
          flex flex-col gap-1
          lg:max-w-[347px]
        "
      >
        <p className="text-body-3 text-base-brown-400 leading-5">
          - Author
        </p>

        <p className="text-headline-3 text-base-brown-500 leading-8">
          Thompson P.
        </p>

        <p className="mt-2 text-body-1 text-base-brown-400">
          I am a pet enthusiast and freelance writer who specializes in animal
          behavior and care. With a deep love for cats, I enjoy sharing insights
          on feline companionship and wellness.
          <br />
          <br />
          When I’m not writing, I spend time volunteering at my local animal
          shelter, helping cats find loving homes.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;

