import NavBar from "@/components/navbar/NavBar";
import Button from "@/components/common/Button";
import { User, IterationCw } from "lucide-react";
import { Link } from "react-router-dom";
import useUpdateProfile from "@/hooks/user/useUpdateProfile";
import avatarProfile from "@/assets/images/user-profile.png"
import FileUploadButton from "@/components/common/FileUploadButton";
import { useAuth } from "@/context/AuthContext";
function MemberProfilePage() {
  const {
    form,
    handleChange,
    handleFileChange,
    handleSubmit,
    isLoading,
    fieldErrors,
  } = useUpdateProfile();
  const { profile } = useAuth()


  const inputStyle =
    "w-full bg-white p-3 pl-4 text-body-1 outline-none rounded-lg transition-colors";

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-base-brown-100">
        <div className="max-w-[794px] mx-auto lg:pt-13">
          {/* Header */}
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
              Profile
            </h4>
          </div>

          <div className="lg:flex lg:gap-12 lg:mt-8">
            {/* Sidebar */}
            <div className="hidden lg:block">
              <MenuMember />
            </div>

            {/* Content */}
            <div className="bg-base-brown-200 px-4 pt-6 pb-10 space-y-6 lg:p-10 lg:rounded-2xl lg:grow">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-7">
                <img
                  src={form.image || avatarProfile}
                  alt="profile"
                  className="w-28 h-28 rounded-full object-cover"
                />
                <div className="flex flex-col gap-1">
                  <FileUploadButton
                    variant="secondary"
                    size="lg"
                    onChange={handleFileChange}
                  >
                    Upload profile picture
                  </FileUploadButton>
                  {(fieldErrors.image) && <div className="text-body-3 text-center text-brand-red">{fieldErrors.image}</div>}
                </div>
              </div>

              <hr />

              {/* Form */}
              <form
                className="flex flex-col gap-6 lg:gap-7"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-1 text-body-1 text-base-brown-400">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                  {(fieldErrors.name) && <div className="text-body-3 text-brand-red">{fieldErrors.name}</div>}
                </div>
                <div className="flex flex-col gap-1 text-body-1 text-base-brown-400">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={form.username}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                  {(fieldErrors.username) && <div className="text-body-3 text-brand-red">{fieldErrors.username}</div>}
                </div>

                <div className="mt-6 text-body-1 text-base-brown-400/60">
                  <p>Email</p>
                  <p className="p-3 pl-4">{form.email}</p>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="mt-3 self-start"
                  disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              </form>
            </div>
          </div>
        </div >
      </div >
    </>
  );
}

export default MemberProfilePage;


function MenuMember({ className = "" }) {
  return (
    <div className="flex lg:flex-col">
      <button className="px-4 py-3 flex gap-3 text-base-brown-500">
        <User size={24} />
        Profile
      </button>

      <Link
        to="/member-reset-password"
        className={`px-4 py-3 flex gap-3 text-base-brown-400/70 ${className}`}
      >
        <IterationCw size={24} />
        Reset password
      </Link>
    </div>
  );
}