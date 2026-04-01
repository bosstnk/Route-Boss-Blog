import {
    Facebook,
    Linkedin,
    Twitter,
    Smile,
    Copy,
    X,
} from "lucide-react";
import { showToast } from "../common/showToast";

function LikeShare({ likeAmount, onRequireAuth, onLike }) {

    const shareLink = encodeURI(window.location.href);
    const handleLike = () => {
        const isGuest = onRequireAuth();
        if (isGuest) return;
        onLike();
    };

    return (

        <div className="bg-base-brown-200 flex flex-col gap-6 p-4 md:flex-row md:justify-between md:rounded-2xl xl:px-6">
            <button
                className="bg-white flex items-center justify-center gap-1.5 px-10 py-3 rounded-full border border-base-brown-400"
                onClick={handleLike}
            >
                <Smile size={24} color="#43403B" strokeWidth={1.5} />
                <span className="text-body-1 text-base-brown-600">
                    {likeAmount}
                </span>
            </button>
            <div className="flex gap-2 md:gap-3">
                <button
                    className="bg-white flex items-center justify-center grow gap-1.5 px-7 py-3 rounded-full border border-base-brown-400"
                    onClick={() => {
                        navigator.clipboard.writeText(shareLink);
                        showToast({
                            title: "Copied!",
                            description: "This article has been copied to your clipboard.",
                            type: "success"
                        });

                    }}
                >
                    <Copy size={24} color="#26231E" strokeWidth={1.5} />
                    <span className="text-body-1 text-base-brown-600">
                        Copy link
                    </span>
                </button>
                <a href="#" className="bg-white p-3 rounded-full border border-base-brown-400">
                    <Facebook strokeWidth={1.5} />
                </a>
                <a href="#" className="bg-white p-3 rounded-full border border-base-brown-400">
                    <Linkedin strokeWidth={1.5} />
                </a>
                <a href="#" className="bg-white p-3 rounded-full border border-base-brown-400">
                    <Twitter strokeWidth={1.5} />
                </a>
            </div>
        </div>

    );

}

export default LikeShare;