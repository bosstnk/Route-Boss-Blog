import LogoPage from "@/assets/images/logo.svg";
import Frame from "@/assets/images/frame.svg"

function NavBar() {
  return (
    // pading x-[7.5rem] 120px or padding x-32 128px
    <nav className="w-full px-6 py-3 flex items-center justify-between bg-base-brown-100 border-b border-b-base-brown-300">
      <img src={LogoPage} alt="logo-page" className="w-6 h-6 xl:w-auto xl:h-auto" />
      <img src={Frame} alt="hamburger-bar" className="xl:hidden" />

      <div className="hidden xl:flex gap-8">
        <button className="text-body-1 text-base-brown-600 bg-base-white inline-flex items-center justify-center rounded-full px-10 py-3 leading-6 border border-base-brown-400">
          Log in
        </button>

        <button className="text-body-1 text-base-white bg-base-brown-600 inline-flex items-center justify-center rounded-full px-10 py-3 leading-6">
          Sign up
        </button>
      </div>
    </nav>
  );
}

export default NavBar;