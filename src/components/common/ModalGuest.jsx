import { X } from "lucide-react";
import Button from "./Button";

export default function ModalGuest({
    open,
    onClose,
    onConfirm,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 bg-base-brown-100 rounded-2xl px-6 pt-4 pb-10 flex flex-col items-center gap-6 lg:w-[621px]">

                {/* Close */}
                <div className="w-full flex justify-end">
                    <Button iconOnly variant="text" leftIcon={<X strokeWidth={1.5} />}></Button>
                </div>

                {/* Content */}
                <div className="flex flex-col items-center gap-10 text-center">
                    <h3 className="text-headline-3 lg:text-headline-2 text-base-brown-600">
                        Create an account to continue
                    </h3>
                    {/* Actions */}
                    <Button variant="primary" onClick={onConfirm}>
                        Create account
                    </Button>
                    <div className="flex flex-row items-center justify-center gap-3">
                        <span className="text-body-1 text-base-brown-400">
                            Already have an account?
                        </span>
                        <Button variant="text">Log in</Button>
                    </div>

                </div>
            </div>
        </div>
    );
} 