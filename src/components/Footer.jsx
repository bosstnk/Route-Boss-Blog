import linkinIcon from "@/assets/images/linkedIN_black.svg"
import githubIcon from "@/assets/images/github_black.svg"
import googleIcon from "@/assets/images/google_black.svg"
import { Link } from "react-router-dom"

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <div className="w-full py-10 px-4 flex flex-col items-center gap-6 bg-base-brown-200 lg:py-[60px] lg:px-[120px] lg:flex-row lg:justify-between">
            <div className="flex flex-row gap-6">
                <p className="text-body-1 leading-6 text-base-brown-500">Get in touch</p>
                <div className="flex flex-row gap-4">
                    <img src={linkinIcon} alt="linkin icon" />
                    <img src={githubIcon} alt="github icon" />
                    <img src={googleIcon} alt="google icon" />
                </div>
            </div>
            <Link to={"/"} onClick={scrollToTop}>
                <span className="text-body-1 text-base-brown-600 underline">Home page</span>
            </Link>
        </div>
    )
}

export default Footer;