import Button from "./Button";
import ModalShell from "./ModalShell";

export default function ModalGuest({
    open,
    onClose,
    onConfirm,
    onLogin,
}) {
    return (
        <ModalShell open={open} onClose={onClose} className="px-4 pt-4 pb-10 lg:w-[621px]">
            {/* Content */}
            <div className="flex flex-col items-center gap-4 text-center lg:gap-10">
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
                    <Button size="none" variant="text" onClick={onLogin}>Log in</Button>
                </div>
            </div>
        </ModalShell>
    );
}
