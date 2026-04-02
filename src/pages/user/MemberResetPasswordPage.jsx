import NavBar from "@/components/navbar/NavBar";
import { User, IterationCw } from "lucide-react";
import avatarProfile from "@/assets/images/user-profile.png"
import { Link } from "react-router-dom";
import useResetPassword from "@/hooks/user/useResetPassword";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
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

  const inputStyle =
    "w-full bg-white p-3 pl-4 text-body-1 outline-none rounded-lg transition-colors placeholder:text-base-brown-400";

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
              <MenuMember />
            </div>

            <div className="bg-base-brown-200 px-4 pt-6 pb-10 space-y-6 lg:p-10 lg:rounded-2xl lg:grow">
              <form
                className="flex flex-col gap-6 lg:gap-7"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-1 text-body-1 text-base-brown-400">
                  <label htmlFor="currentPassword">
                    Current password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={form.currentPassword}
                    onChange={handleChange}
                    placeholder="Current password"
                    className={inputStyle}
                  />
                  {(fieldErrors.currentPassword) && <div className="text-body-3 text-brand-red">{fieldErrors.currentPassword}</div>}
                </div>
                <div className="flex flex-col gap-1 text-body-1 text-base-brown-400">
                  <label htmlFor="newPassword">
                    New password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    placeholder="New password"
                    className={inputStyle}
                  />
                  {(fieldErrors.newPassword) && <div className="text-body-3 text-brand-red">{fieldErrors.newPassword}</div>}
                </div>
                <div className="flex flex-col gap-1 text-body-1 text-base-brown-400">
                  <label htmlFor="confirmPassword">
                    Confirm new password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                    className={inputStyle}
                  />
                  {(fieldErrors.confirmPassword) && <div className="text-body-3 text-brand-red">{fieldErrors.confirmPassword}</div>}
                </div>
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


function MenuMember({ className = "" }) {
  return (
    <div className="flex lg:flex-col">
      <Link
        to={"/member-profile"}
        className={`text-body-1 text-base-brown-400/70 px-4 py-3 flex gap-3 cursor-pointer ${className}`}
      >
        <User size={24} color="#DAD6D1" strokeWidth={2} absoluteStrokeWidth />
        <span className="items-center">Profile</span>
      </Link>
      <button
        className={`text-body-1 text-base-brown-500 px-4 py-3 flex gap-3 cursor-pointe`}
      >
        <IterationCw size={24} color="#75716B" strokeWidth={2} absoluteStrokeWidth />
        <span className="items-center">Reset password</span>
      </button>
    </div>
  )
}