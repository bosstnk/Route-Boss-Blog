import imageProfile from "@/assets/images/heroPicture.jpg";

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
          Let’s Journey Together
        </h2>

        <p className="text-body-1 text-base-brown-400">
          Stories, perspectives, and lessons from a journey still in progress.
        </p>
      </div>

      {/* CENTER : Image */}
      <div className="relative w-[343px] h-[470px] lg:w-[386px] lg:h-[529px]">

        {/* === Blob Background === z-0 */}
        <div
          className="absolute"
          style={{
            width: '80%', height: '80%',
            top: '-10%', left: '-15%',
            borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
            background: 'rgba(147,197,253,0.18)',
            // animation: 'blobmove1 6s ease-in-out infinite',
            zIndex: 0,
          }}
        />
        <div
          className="absolute"
          style={{
            width: '60%', height: '60%',
            bottom: '-8%', right: '-12%',
            borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%',
            background: 'rgba(167,139,250,0.15)',
            // animation: 'blobmove2 7s ease-in-out infinite',
            zIndex: 0,
          }}
        />

        {/* === Image ===  */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl border border-white/15"
        >
          <img
            src={imageProfile}
            alt="Author profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* === Orb === z-10 */}
        <div
          className="absolute rounded-full border-2 border-white/20"
          style={{
            width: 40, height: 40,
            top: '5%', right: '-4%',
            background: 'radial-gradient(circle at 35% 35%, #c4b5fd, #7c3aed)',
            animation: 'float2 4s ease-in-out infinite',
            zIndex: 10,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 24, height: 24,
            bottom: '18%', left: '-3%',
            background: 'radial-gradient(circle at 35% 35%, #bfdbfe, #60a5fa)',
            animation: 'float3 5s ease-in-out infinite',
            zIndex: 10,
          }}
        />

        <div
          className="absolute rounded-full border-2 border-white/30"
          style={{
            width: 56, height: 56,
            top: '8%', left: '-8%',
            background: 'radial-gradient(circle at 35% 35%, #93c5fd, #3b82f6)',
            animation: 'float1 3.5s ease-in-out infinite',
            zIndex: 10,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 14, height: 14,
            bottom: '8%', right: '-2%',
            background: 'radial-gradient(circle at 35% 35%, #ddd6fe, #8b5cf6)',
            animation: 'float1 4.5s ease-in-out infinite reverse',
            zIndex: 10,
          }}
        />

        {/* === Keyframes === */}
        <style>{`
  @keyframes blobmove1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50%       { transform: translate(8px, -10px) scale(1.05); }
  }
  @keyframes blobmove2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50%       { transform: translate(-6px, 8px) scale(1.04); }
  }
  @keyframes float1 {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-10px); }
  }
  @keyframes float2 {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-14px); }
  }
  @keyframes float3 {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }
  @keyframes floatImg {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-10px); }
  }
`}</style>

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
          Thanakorn S.
        </p>

        <p className="mt-2 text-body-1 text-base-brown-400">
          I love learning new things, and I enjoy listening to people and hearing different perspectives because everyone has a unique story and a different way of seeing the world.
          <br />
          <br />
          This space is where I share the lessons and experiences I've gained along the way. My hope is that these stories can inspire someone, help them through a difficult time, or simply remind them that they're not alone. If even one person finds comfort or encouragement here, then it's worth sharing.
          <br />
          <br />
          And maybe one day, these words will remind me to keep going too.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;

