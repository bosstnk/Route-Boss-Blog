import { X } from "lucide-react";
import Button from "./Button";

export default function Modal({
    open,
    onClose,
    title,
    description,
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
            <div className="relative z-10 w-[343px] bg-base-brown-100 rounded-2xl px-6 pt-4 pb-10 flex flex-col items-center gap-6 lg:w-[477px]">

                {/* Close */}
                <div className="w-full flex justify-end">
                    <Button iconOnly variant="text" leftIcon={<X strokeWidth={1.5} />}></Button>
                </div>

                {/* Content */}
                <div className="flex flex-col items-center gap-6 text-center">
                    <h3 className="text-headline-3 text-base-brown-600">
                        {title}
                    </h3>

                    <p className="text-body-1 text-base-brown-400">
                        {description}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                        <Button variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>

                        <Button onClick={onConfirm}>
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
} 