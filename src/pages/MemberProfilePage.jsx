import NavBar from "@/components/navbar/NavBar";
import { User, IterationCw } from "lucide-react";
import { Link } from "react-router-dom";
import useProfile from "@/hooks/useProfile";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
function MemberProfilePage() {
  const {
    form,
    inputProfile,
    handleFileChange,
    handleSubmit,
    isSaving,
    error,
  } = useProfile();

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
              src={form.image || "/default-avatar.png"}
              alt="profile"
              className="w-10 h-10 rounded-full lg:w-14 lg:h-14 object-cover"
            />
            <h4 className="text-headline-4 text-base-brown-400 lg:text-headline-3">
              {form.username}
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
                  src={form.image || "/default-avatar.png"}
                  alt="profile"
                  className="w-28 h-28 rounded-full object-cover"
                />

                <label
                  htmlFor="upload"
                  className="text-body-1 leading-6 px-10 py-3 rounded-full text-base-brown-600 bg-white border border-base-brown-400 cursor-pointer"
                >
                  Upload profile picture
                </label>

                <input
                  id="upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <hr />

              {/* Form */}
              <form
                className="flex flex-col items-start"
                onSubmit={handleSubmit}
              >
                <label className="pb-1 text-body-1 text-base-brown-400">
                  Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={inputProfile}
                  className={inputStyle}
                />

                <label className="pb-1 mt-6 text-body-1 text-base-brown-400">
                  Username
                </label>
                <input
                  name="username"
                  value={form.username}
                  onChange={inputProfile}
                  className={inputStyle}
                />

                <div className="mt-6 text-body-1 text-base-brown-400/60">
                  <p>Email</p>
                  <p className="p-3 pl-4">{form.email}</p>
                </div>

                {error && (
                  <p className="text-red-500 mt-4 text-sm">{error}</p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  text={isSaving ? "Saving..." : "Save"}
                  className="mt-6"
                  disabled={isSaving}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
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