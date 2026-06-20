import AdminSidebar from "@/components/AdminSidebar";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import FormInput from "@/components/common/FormInput";
import { useState } from "react";
import useResetPassword from "@/features/user/hooks/useResetPassword";

export default function AdminResetPasswordPage() {
    const { form, handleChange, handleSubmit, isLoading, fieldErrors } = useResetPassword();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
                    <FormInput
                        label="Current password"
                        name="currentPassword"
                        type="password"
                        placeholder="Current password"
                        value={form.currentPassword}
                        onChange={handleChange}
                        error={fieldErrors.currentPassword}
                    />
                    <FormInput
                        label="New password"
                        name="newPassword"
                        type="password"
                        placeholder="New password"
                        value={form.newPassword}
                        onChange={handleChange}
                        error={fieldErrors.newPassword}
                    />
                    <FormInput
                        label="Confirm new password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        error={fieldErrors.confirmPassword}
                    />
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
