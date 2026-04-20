import imageProfile from "@/assets/images/picture-profile.jpg"

function AuthorProfile({ className = "", authorName, authorPic, authorBio }) {
    return (
        <div className={`bg-base-brown-200 rounded-2xl p-6 flex flex-col gap-5 ${className}`}>
            <div className="flex gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden">
                    <img
                        src={authorPic || imageProfile}
                        alt="image profile"
                        className="object-cover w-full h-full"
                    />
                </div>
                <div>
                    <p className="text-body-3 text-base-brown-400">Author</p>
                    <h4 className="text-headline-4 text-base-brown-500">{authorName}</h4>
                </div>
            </div>
            {authorBio && (
                <>
                    <hr className="border-base-brown-300" />
                    <p className="text-base-brown-400">{authorBio}</p>
                </>
            )}
        </div>
    )
}

export default AuthorProfile