import AdminSidebar from "@/components/AdminSidebar"
import { Input } from "@/components/ui/input";
import Button from "@/components/common/Button";
import { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { showToast } from "@/components/common/showToast";

export default function AdminResetPasswordPage() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [valid, setValid] = useState({
        password: true,
        newPassword: true,
        confirmNewPassword: true,
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidPassword = password.trim() !== "";
        const isValidNewPassword = newPassword.trim() !== "";
        const isValidConfirmPassword =
            confirmNewPassword.trim() !== "" && confirmNewPassword === newPassword;

        setValid({
            password: isValidPassword,
            newPassword: isValidNewPassword,
            confirmNewPassword: isValidConfirmPassword,
        });

        if (isValidPassword && isValidNewPassword && isValidConfirmPassword) {
            setIsDialogOpen(true);
        }
    };

    const handleResetPassword = async () => {
        try {
            await axios.put(`${API_BASE_URL}/user/reset-password`, {
                currentPassword: password,
                newPassword,
            });

            showToast({
                title: "Reset!",
                description: "Password reset successful. You can now log in with your new password.",
                type: "success",
            });

            setPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
        } catch (err) {
            showToast({
                title: "Error",
                description: err.response?.data?.message || "Failed to reset password",
                type: "error",
            });
        } finally {
            setIsDialogOpen(false);
        }
    };
    return (
        <div className="flex bg-base-brown-100">
            <AdminSidebar />
            {/* Main content */}
            <main className="flex-1">
                <div className="flex justify-between items-center py-6 px-[60px] border-b border-b-base-brown-300">
                    <h3 className="text-headline-3 text-base-brown-600">Reset Password</h3>
                    <Button variant="primary" onClick={handleSubmit}>
                        Reset password
                    </Button>
                </div>

                <div className="mt-10 ml-[60px] space-y-7 max-w-[480px]">
                    <div className="relative">
                        <label
                            htmlFor="current-password"
                            className="block text-body-1 text-base-brown-400 mb-1"
                        >
                            Current password
                        </label>
                        <Input
                            id="current-password"
                            type="password"
                            placeholder="Current password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`pl-4 py-3 rounded-lg bg-white border-base-brown-300 placeholder:text-base-brown-400 focus-visible:ring-1 focus-visible:ring-base-brown-300 focus-visible:border-base-brown-400 ${!valid.password ? "border-red-500" : ""
                                }`}
                        />
                        {!valid.password && (
                            <p className="text-red-500 text-xs absolute mt-1">
                                This field is required
                            </p>
                        )}
                    </div>
                    <div className="relative">
                        <label
                            htmlFor="new-password"
                            className="block text-body-1 text-base-brown-400 mb-1"
                        >
                            New password
                        </label>
                        <Input
                            id="new-password"
                            type="password"
                            placeholder="New password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={`pl-4 py-3 rounded-lg bg-white border-base-brown-300 placeholder:text-base-brown-400 focus-visible:ring-1 focus-visible:ring-base-brown-300 focus-visible:border-base-brown-400 ${!valid.password ? "border-red-500" : ""
                            }`}
                        />
                        {!valid.newPassword && (
                            <p className="text-red-500 text-xs absolute mt-1">
                                Password must be at least 8 characters
                            </p>
                        )}
                    </div>
                    <div className="relative">
                        <label
                            htmlFor="confirm-new-password"
                            className="block text-body-1 text-base-brown-400 mb-1"
                        >
                            Confirm new password
                        </label>
                        <Input
                            id="confirm-new-password"
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className={`pl-4 py-3 rounded-lg bg-white border-base-brown-300 placeholder:text-base-brown-400 focus-visible:ring-1 focus-visible:ring-base-brown-300 focus-visible:border-base-brown-400 ${!valid.password ? "border-red-500" : ""
                            }`}
                        />
                        {!valid.confirmNewPassword && (
                            <p className="text-red-500 text-xs absolute mt-1">
                                Passwords do not match
                            </p>
                        )}
                    </div>
                </div>
            </main>
            <ResetPasswordModal
                dialogState={isDialogOpen}
                setDialogState={setIsDialogOpen}
                resetFunction={handleResetPassword}
            />
        </div>
    );
}

function ResetPasswordModal({ dialogState, setDialogState, resetFunction }) {
    return (
        <AlertDialog open={dialogState} onOpenChange={setDialogState}>
            <AlertDialogContent className="bg-white rounded-md pt-16 pb-6 max-w-[352px] sm:max-w-md flex flex-col items-center">
                <AlertDialogTitle className="text-3xl font-semibold pb-2 text-center">
                    Reset password
                </AlertDialogTitle>
                <AlertDialogDescription className="flex flex-row mb-2 justify-center font-medium text-center text-muted-foreground">
                    Do you want to reset your password?
                </AlertDialogDescription>
                <div className="flex flex-row gap-4">
                    <button
                        onClick={() => setDialogState(false)}
                        className="bg-background px-10 py-4 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={resetFunction}
                        className="rounded-full text-white bg-foreground hover:bg-muted-foreground transition-colors py-4 text-lg px-10 "
                    >
                        Reset
                    </button>
                </div>
                <AlertDialogCancel className="absolute right-4 top-2 sm:top-4 p-1 border-none">
                    <X className="h-6 w-6" />
                </AlertDialogCancel>
            </AlertDialogContent>
        </AlertDialog>
    );
}