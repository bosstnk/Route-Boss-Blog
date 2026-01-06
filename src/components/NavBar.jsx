import LogoPage from "@/assets/images/logo.svg";
import Frame from "@/assets/images/frame.svg"
import Button from "./common/Button";

function NavBar() {
  return (
    <nav className="w-full px-6 py-3 flex items-center justify-between bg-base-brown-100 border-b border-b-base-brown-300 lg:px-[120px] lg:py-4">
      <img src={LogoPage} alt="logo-page" className="w-6 h-6 lg:w-auto lg:h-auto" />
      <img src={Frame} alt="hamburger-bar" className="lg:hidden" />

      <div className="hidden lg:flex gap-8">
        <Button text="Log in" variant="secondary"/>
        <Button text="Sign up" variant="primary"/>
      </div>
    </nav>
  );
}

export default NavBar;