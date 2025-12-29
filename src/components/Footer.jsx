import { Linkedin,Github,Mail } from 'lucide-react';

function Footer() {
    return (
        <div className="w-full px-4 py-10 flex flex-col items-center gap-6 bg-base-brown-200 xl:px-[7.5rem] xl:py-[3.75rem] xl:flex-row xl:justify-between">
            <div className="flex flex-row gap-6">
                <p className="text-body-1 leading-6 text-base-brown-500">Get in touch</p>
                <div className="flex flex-row gap-4">
                    <Linkedin />
                    <Github />
                    <Mail />
                </div>
            </div>
            <button className="text-body-1 text-base-brown-600 underline">Home page</button>
        </div>
    )
}

export default Footer;