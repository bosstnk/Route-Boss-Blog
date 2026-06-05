import AdminSidebar from "@/components/AdminSidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Button from "@/components/common/Button";
import FileUploadButton from "@/components/common/FileUploadButton";

import useUpdateProfile from "@/hooks/user/useUpdateProfile";

function AdminProfilePage() {
    const {
        form,
        handleChange,
        handleFileChange,
        handleSubmit,
        isLoading,
        fieldErrors
    } = useUpdateProfile();

    const inputClass = (hasError) =>
        `mt-1 w-full bg-white p-3 pl-4 text-body-1 text-base-brown-500 outline-none rounded-lg placeholder:text-base-brown-400 border transition-colors focus:ring-1 disabled:opacity-50 disabled:cursor-not-allowed ${hasError
            ? "border-brand-red focus:border-brand-red focus:ring-brand-red/70"
            : "border-base-brown-300 focus:border-base-brown-400 focus:ring-base-brown-300"
        }`;

    return (
        <div className="flex flex-row bg-base-brown-100">
            <AdminSidebar />

            <main className="flex-1">
                <div className="flex justify-between items-center py-6 px-[60px] border-b border-b-base-brown-300">
                    <h3 className="text-headline-3 text-base-brown-600">Profile</h3>
                    <Button variant="primary" onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save"}
                    </Button>
                </div>

                <div className="flex flex-col gap-10 pt-10 px-[60px] pb-[120px]">
                    <div>
                        <div className="flex items-center">
                            <Avatar className="w-30 h-30 mr-4">
                                <AvatarImage
                                    src={form.image}
                                    alt="Profile picture"
                                    className="object-cover"
                                />
                                <AvatarFallback delayMs={100} className="bg-white text-base-brown-400 text-5xl">
                                    {form.username?.trim().charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <FileUploadButton
                                variant="secondary"
                                size="lg"
                                onChange={handleFileChange}
                            >
                                Upload profile picture
                            </FileUploadButton>
                        </div>
                        {fieldErrors.image && (
                            <p className="text-body-3 text-brand-red mt-2">
                                {fieldErrors.image}
                            </p>
                        )}
                    </div>

                    <form className="space-y-7">
                        <div className="w-120">
                            <label htmlFor="name" className="text-base-brown-400 text-body-1">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                                className={inputClass(fieldErrors.name)}
                            />
                            {fieldErrors.name && (
                                <p className="text-body-3 text-brand-red mt-1">
                                    {fieldErrors.name}
                                </p>
                            )}
                        </div>
                        <div className="w-120">
                            <label htmlFor="username" className="text-base-brown-400 text-body-1">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={form.username}
                                onChange={handleChange}
                                className={inputClass(fieldErrors.username)}
                            />
                            {fieldErrors.username && (
                                <p className="text-body-3 text-brand-red mt-1">
                                    {fieldErrors.username}
                                </p>
                            )}
                        </div>
                        <div className="w-120">
                            <label htmlFor="email" className="text-base-brown-400 text-body-1">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                disabled
                                className={inputClass(false)}
                            />
                        </div>
                        <div>
                            <label htmlFor="bio" className="text-base-brown-400 text-body-1">Bio (max 120 letters)</label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={form.bio}
                                onChange={handleChange}
                                maxLength={120}
                                rows={10}
                                className={`${inputClass(fieldErrors.bio)} resize-y`}
                            />
                            {fieldErrors.bio && (
                                <p className="text-body-3 text-brand-red mt-1">
                                    {fieldErrors.bio}
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default AdminProfilePage
