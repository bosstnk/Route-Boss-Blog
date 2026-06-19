import AdminSidebar from "@/components/AdminSidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Button from "@/components/common/Button";
import FileUploadButton from "@/components/common/FileUploadButton";
import FormInput from "@/components/common/FormInput";
import { inputClassName } from "@/components/common/formInputStyles";

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
                            <FormInput
                                label="Name"
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                                error={fieldErrors.name}
                            />
                        </div>
                        <div className="w-120">
                            <FormInput
                                label="Username"
                                name="username"
                                type="text"
                                value={form.username}
                                onChange={handleChange}
                                error={fieldErrors.username}
                            />
                        </div>
                        <div className="w-120">
                            <FormInput
                                label="Email"
                                name="email"
                                type="email"
                                value={form.email}
                                disabled
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="bio" className="text-base-brown-400 text-body-1">Bio (max 120 letters)</label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={form.bio}
                                onChange={handleChange}
                                maxLength={120}
                                rows={10}
                                className={inputClassName(!!fieldErrors.bio, "mt-1 resize-y")}
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
