import imageProfile from "@/assets/images/picture-profile.jpg"

function AuthorProfile({className="", authorName}) {
    return (
        <div className={`bg-base-brown-200 rounded-2xl p-6 flex flex-col gap-5 ${className}`}>
            <div className="flex gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden">
                    <img src={imageProfile} alt="image profile" className="object-cover w-full h-full" />
                </div>
                <div>
                    <p className="text-body-3 text-base-brown-400">Author</p>
                    <h4 className="text-headline-4 text-base-brown-500">{authorName}</h4>
                </div>
            </div>
            <hr className="border-base-brown-300" />
            <p className="text-base-brown-400">
                I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.
                <br /><br />
                When i’m not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes.
            </p>
        </div>
    )
}

export default AuthorProfile