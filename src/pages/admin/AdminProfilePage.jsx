import AdminSidebar from "@/components/AdminSidebar"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button as UploadButton } from "@/components/ui/button";

import useUpdateProfile from "@/hooks/user/useUpdateProfile";

function AdminProfilePage() {
    const {
        form,
        inputProfile,
        handleFileChange,
        handleSubmit,
        isSaving
    } = useUpdateProfile();

    const inputStyle = "mt-1 pl-4 pr-3 py-3 rounded-lg bg-white border border-base-brown-300 text-base-brown-500 focus-visible:ring-1 focus-visible:ring-base-brown-300 focus-visible:border-base-brown-400"

    return (
        <div className="flex flex-row bg-base-brown-100">
            <AdminSidebar />

            <main className="flex-1">
                <div className="flex justify-between items-center py-6 px-[60px] border-b border-b-base-brown-300">
                    <h3 className="text-headline-3 text-base-brown-600">Profile</h3>
                    <Button variant="primary" text="Save" onClick={handleSubmit}
                        disabled={isSaving} />
                </div>

                <div className="flex flex-col gap-10 pt-10 px-[60px] pb-[120px]">
                    <div className="flex items-center">
                        <Avatar className="w-30 h-30 mr-4">
                            <AvatarImage
                                src={form.image}
                                alt="Profile picture"
                            />
                            <AvatarFallback>TP</AvatarFallback>
                        </Avatar>
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

                    <form className="space-y-7">
                        <div className="w-120">
                            <label htmlFor="name" className="text-base-brown-400">Name</label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={inputProfile}
                                className={inputStyle}
                            />
                        </div>
                        <div className="w-120">
                            <label htmlFor="username" className="text-base-brown-400">Username</label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                value={form.username}
                                onChange={inputProfile}
                                className={inputStyle}
                            />
                        </div>
                        <div className="w-120">
                            <label htmlFor="email" className="text-base-brown-400">Email</label>
                            <Input
                                id="email"
                                name="email"
                                value={form.email}
                                disabled
                                className={inputStyle}
                            />
                        </div>
                        <div>
                            <label htmlFor="bio" className="text-base-brown-400">Bio (max 120 letters)</label>
                            <Textarea
                                id="bio"
                                name="bio"
                                value={form.bio}
                                onChange={inputProfile}
                                maxLength={120}
                                rows={10}
                                className="mt-1 pt-3 pr-1 pb-1 pl-4 rounded-lg bg-white border border-base-brown-300 text-base-brown-500 focus-visible:ring-1 focus-visible:ring-base-brown-300 focus-visible:border-base-brown-400"
                            />
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default AdminProfilePage