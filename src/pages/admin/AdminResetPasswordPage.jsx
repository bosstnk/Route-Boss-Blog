import AdminSidebar from "@/components/AdminSidebar";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useState } from "react";
import useResetPassword from "@/hooks/user/useResetPassword";

export default function AdminResetPasswordPage() {
    const { form, handleChange, handleSubmit, isLoading, fieldErrors } = useResetPassword();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const inputClass = (hasError) =>
        `w-full bg-white p-3 pl-4 text-body-1 text-base-brown-500 outline-none rounded-lg placeholder:text-base-brown-400 border transition-colors focus:ring-1 ${hasError
            ? "border-brand-red focus:border-brand-red focus:ring-brand-red/70"
            : "border-base-brown-300 focus:border-base-brown-400 focus:ring-base-brown-300"
        }`;

    return (
        <div className="flex bg-base-brown-100">
            <AdminSidebar />

            <main className="flex-1">
                <div className="flex justify-between items-center py-6 px-[60px] border-b border-b-base-brown-300">
                    <h3 className="text-headline-3 text-base-brown-600">Reset Password</h3>
                    <Button
                        variant="primary"
                        disabled={isLoading}
                        onClick={() => setIsDialogOpen(true)}
                    >
                        {isLoading ? "Resetting..." : "Reset password"}
                    </Button>
                </div>

                <div className="mt-10 ml-[60px] space-y-7 max-w-[480px]">
                    <div>
                        <label
                            htmlFor="currentPassword"
                            className="block text-body-1 text-base-brown-400 mb-1"
                        >
                            Current password
                        </label>
                        <input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            placeholder="Current password"
                            value={form.currentPassword}
                            onChange={handleChange}
                            className={inputClass(fieldErrors.currentPassword)}
                        />
                        {fieldErrors.currentPassword && (
                            <p className="text-body-3 text-brand-red mt-1">
                                {fieldErrors.currentPassword}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="newPassword"
                            className="block text-body-1 text-base-brown-400 mb-1"
                        >
                            New password
                        </label>
                        <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            placeholder="New password"
                            value={form.newPassword}
                            onChange={handleChange}
                            className={inputClass(fieldErrors.newPassword)}
                        />
                        {fieldErrors.newPassword && (
                            <p className="text-body-3 text-brand-red mt-1">
                                {fieldErrors.newPassword}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-body-1 text-base-brown-400 mb-1"
                        >
                            Confirm new password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm new password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className={inputClass(fieldErrors.confirmPassword)}
                        />
                        {fieldErrors.confirmPassword && (
                            <p className="text-body-3 text-brand-red mt-1">
                                {fieldErrors.confirmPassword}
                            </p>
                        )}
                    </div>
                </div>
            </main>

            <Modal
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title="Reset password"
                description="Do you want to reset your password?"
                onConfirm={() => {
                    setIsDialogOpen(false);
                    handleSubmit();
                }}
            />
        </div>
    );
}
