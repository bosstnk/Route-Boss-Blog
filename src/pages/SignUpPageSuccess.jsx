import NavBar from "@/components/navbar/NavBar"
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SignUpSuccessPage() {
    const navigate = useNavigate();
    return (
        <>
            <NavBar />
            <main className="mx-4 mt-10 lg:mt-[60px]">
                <div className="flex flex-col items-center gap-10 max-w-[798px] py-10 mx-auto bg-base-brown-200 rounded-2xl">
                    <div className="p-4 bg-brand-green rounded-full text-white">
                        <Check size={48} strokeWidth={8} absoluteStrokeWidth />
                    </div>
                    <h3 className="text-headline-3 lg:text-headline-2">Registration success</h3>
                    <Button variant="primary" text="Conitnue" />
                </div>
            </main>
        </>
    );
}

export default SignUpSuccessPage