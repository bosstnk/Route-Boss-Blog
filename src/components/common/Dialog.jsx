import { X } from "lucide-react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../common/Button";

function Dialog({ alertState, setAlertState, onConfirm }) {

    return (
        <AlertDialog open={alertState} onOpenChange={setAlertState}>

            <AlertDialogContent className="flex flex-col items-center gap-6 bg-base-brown-100 px-10 py-10 rounded-2xl">

                <AlertDialogTitle className="text-headline-3 text-center">
                    Delete category
                </AlertDialogTitle>

                <AlertDialogDescription className="text-body-1 text-base-brown-400 text-center">
                    Do you want to delete this category?
                </AlertDialogDescription>

                <div className="flex gap-4">

                    <Button
                        variant="secondary"
                        text="Cancel"
                        onClick={() => setAlertState(false)}
                    />
                    <Button
                        variant="primary"
                        text="Delete"
                        onClick={onConfirm}
                    />

                </div>

                <AlertDialogCancel className="absolute right-4 top-2 bg-base-brown-100 border-none shadow-none">
                    <X size={24} />
                </AlertDialogCancel>

            </AlertDialogContent>

        </AlertDialog>
    );
}

export default Dialog;