import { Linkedin,Github,Mail } from 'lucide-react';

function Footer() {
    return (
        <div className="w-full px-[7.5rem] py-[3.75rem] bg-base-brown-200 flex flex-row justify-between">
            <div className="flex flex-row gap-6">
                <p className="text-body-1 leading-6 text-base-brown-500">Get in touch</p>
                <div className="flex flex-row gap-4">
                    <Linkedin />
                    <Github />
                    <Mail />
                </div>
            </div>
            <button className="text-body-1 underline">Home page</button>
        </div>
    )
}

export default Footer;