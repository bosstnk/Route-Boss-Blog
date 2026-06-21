import Button from "./Button";
import ModalShell from "./ModalShell";

export default function Modal({
    open,
    onClose,
    title,
    description,
    onConfirm,
}) {
    return (
        <ModalShell open={open} onClose={onClose} className="w-[343px] px-6 pt-4 pb-10 lg:w-[477px]">
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
        </ModalShell>
    );
}
