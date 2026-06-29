import NavBar from "@/shared/components/navbar/NavBar";
import avatarProfile from "@/assets/images/user-profile.png"
import useResetPassword from "@/features/user/hooks/useResetPassword";
import { useAuth } from "@/context/AuthContext";
import Button from "@/shared/components/common/Button";
import Modal from "@/shared/components/common/Modal";
import MemberSideMenu from "@/features/user/components/MemberSideMenu";
import FormInput from "@/shared/components/forms/FormInput";
import { useState } from "react";

function MemberResetPasswordPage() {
  const { profile } = useAuth()
  const {
    form,
    handleChange,
    handleSubmit,
    isLoading,
    fieldErrors
  } = useResetPassword();
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-base-brown-100">
        <div className="max-w-[794px] mx-auto lg:pt-13">
          <div className="py-6 px-4 flex items-center gap-3 lg:gap-4 lg:p-0">
            <img
              src={profile.image || avatarProfile}
              alt="profile"
              className="w-10 h-10 rounded-full lg:w-14 lg:h-14 object-cover"
            />
            <h4 className="text-headline-4 text-base-brown-400 lg:text-headline-3">
              {profile.username}
            </h4>
            <span className="text-base-brown-300 mx-2">|</span>
            <h4 className="text-headline-4 text-base-brown-600 lg:text-headline-3">
              Reset password
            </h4>
          </div>

          <div className="lg:flex lg:gap-12 lg:mt-8">
            <div className="hidden lg:block">
              <MemberSideMenu active="reset" />
            </div>

            <div className="bg-base-brown-200 px-4 pt-6 pb-10 space-y-6 lg:p-10 lg:rounded-2xl lg:grow">
              <form
                className="flex flex-col gap-6 lg:gap-7"
                onSubmit={handleSubmit}
              >
                <FormInput
                  label="Current password"
                  name="currentPassword"
                  type="password"
                  value={form.currentPassword}
                  onChange={handleChange}
                  placeholder="Current password"
                  error={fieldErrors.currentPassword}
                />
                <FormInput
                  label="New password"
                  name="newPassword"
                  type="password"
                  value={form.newPassword}
                  onChange={handleChange}
                  placeholder="New password"
                  error={fieldErrors.newPassword}
                />
                <FormInput
                  label="Confirm new password"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  error={fieldErrors.confirmPassword}
                />
                <Button
                  type="button"
                  variant="primary"
                  disabled={isLoading}
                  className="mt-3 self-start"
                  onClick={() => setModalOpen(true)}
                >
                  Reset password
                </Button>
              </form>
              <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Reset Password"
                description="Do you want to reset your password?"
                onConfirm={() => {
                  setModalOpen(false)
                  handleSubmit()
                }}
              />
            </div>
          </div>
        </div >
      </div >
    </>
  );
}

export default MemberResetPasswordPage;