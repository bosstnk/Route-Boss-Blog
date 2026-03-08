import AdminSidebar from "@/components/AdminSidebar"
import { Button } from "@/components/common/Button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button as UploadButton } from "@/components/ui/button";
import imageUser from "@/assets/images/user-picture-demo.jpg"

function AdminProfilePage() {
    const inputSatyle = "mt-1 pl-4 pr-3 py-3 rounded-lg bg-white border border-base-brown-300 text-base-brown-500 focus-visible:ring-1 focus-visible:ring-base-brown-300 focus-visible:border-base-brown-400"

    return (
        <div className="flex flex-row bg-base-brown-100">
            <AdminSidebar />

            <main className="flex-1">
                <div className="flex justify-between items-center py-6 px-[60px] border-b border-b-base-brown-300">
                    <h3 className="text-headline-3 text-base-brown-600">Profile</h3>
                    <Button variant="primary" text="Save" />
                </div>

                <div className="flex flex-col gap-10 pt-10 px-[60px] pb-[120px]">
                    <div className="flex items-center">
                        <Avatar className="w-30 h-30 mr-4">
                            <AvatarImage
                                src={imageUser}
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
                        />
                    </div>

                    <form className="space-y-7">
                        <div className="w-120">
                            <label htmlFor="name" className="text-base-brown-400">Name</label>
                            <Input
                                id="name"
                                defaultValue="Thanakorn S."
                                className={inputSatyle}
                            />
                        </div>
                        <div className="w-120">
                            <label htmlFor="username" className="text-base-brown-400">Username</label>
                            <Input
                                id="username"
                                defaultValue="Thanakorn"
                                className={inputSatyle}
                            />
                        </div>
                        <div className="w-120">
                            <label htmlFor="email" className="text-base-brown-400">Email</label>
                            <Input
                                id="email"
                                type="email"
                                defaultValue="thanakorn.sant@gmail.com"
                                className={inputSatyle}
                            />
                        </div>
                        <div>
                            <label htmlFor="bio" className="text-base-brown-400">Bio (max 120 letters)</label>
                            <Textarea
                                id="bio"
                                defaultValue="I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.


When I'm not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes."
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