import linkinIcon from "@/assets/images/linkedIN_black.svg"
import githubIcon from "@/assets/images/github_black.svg"
import googleIcon from "@/assets/images/google_black.svg"

function Footer() {
    return (
        <div className="w-full px-4 py-10 flex flex-col items-center gap-6 bg-base-brown-200 lg:px-[7.5rem] lg:py-[3.75rem] lg:flex-row lg:justify-between">
            <div className="flex flex-row gap-6">
                <p className="text-body-1 leading-6 text-base-brown-500">Get in touch</p>
                <div className="flex flex-row gap-4">
                    <img src={linkinIcon} alt="linkin icon" />
                    <img src={githubIcon} alt="github icon" />
                    <img src={googleIcon} alt="google icon" />
                </div>
            </div>
            <button className="text-body-1 text-base-brown-600 underline">Home page</button>
        </div>
    )
}

export default Footer;