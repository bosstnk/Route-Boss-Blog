import { X } from "lucide-react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { Link } from "react-router-dom";

function CreateAccountAlert({ alertState, setAlertState }) {
    return (
        <AlertDialog open={alertState} onOpenChange={setAlertState}>
            <AlertDialogContent className="flex flex-col items-center gap-10 bg-base-brown-100 px-4 pt-4 pb-10 lg:max-w-[621px] rounded-2xl">
                <AlertDialogTitle className="text-headline-3 lg:text-headline-2 lg:leading-[48px] text-center pt-12">Create an account to Continue</AlertDialogTitle>
                <Link to={`/signup`} >
                    <Button variant="primary" text="Create Account" />
                </Link>
                <AlertDialogDescription className="flex flex-row gap-3 justify-center pt-4 text-body-1 text-base-brown-400">
                    Already have an account?
                    <a
                        href="/login"
                        className="text-foreground hover:text-muted-foreground transition-colors underline font-semibold"
                    >
                        <Button variant="text" text="Log in"></Button>
                    </a>
                </AlertDialogDescription>
                <AlertDialogCancel className="absolute right-4 top-2 bg-base-brown-100 border-none shadow-none">
                    <X size={24} />
                </AlertDialogCancel>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CreateAccountAlert