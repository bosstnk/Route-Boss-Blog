import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; // ⭐ เพิ่ม
import Comments from "./post/Comment";
import LikeShare from "./post/LikeShare";
import AuthorProfile from "./post/AuthorProfile";
import usePost from "@/hooks/usePost";
import CreateAccountAlert from "./auth/CreateAccountAlert";
import LoadingScreen from "./common/LoadingScreen";
import PostContent from "./post/PostContent";

export default function ViewPost() {
    const { postId } = useParams();
    const { post, isLoading } = usePost(postId);
    const { isAuthenticated } = useAuth(); // ⭐ เช็ค login
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    if (isLoading) return <LoadingScreen />;

    // ⭐ function กลาง
    const openAlertIfGuest = () => {
        if (!isAuthenticated) {
            setIsAlertOpen(true);
            return true; // guest
        }
        return false; // logged in
    };

    return (
        <div className="max-w-[1440px] mx-auto md:px-8 md:pt-8 xl:px-[120px] xl:pt-[60px] xl:pb-[120px]">
            <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-[200px] sm:h-[340px] lg:h-[587px] md:rounded-lg"
            />

            <div className="flex flex-col xl:flex-row xl:gap-20 xl:mt-12">
                <div>
                    <PostContent post={post} />
                    <AuthorProfile className="xl:hidden" authorName={post.author} />

                    <LikeShare
                        likeAmount={post.likes_count}
                        onRequireAuth={openAlertIfGuest}
                    />

                    <Comments onRequireAuth={openAlertIfGuest} />
                </div>

                <AuthorProfile
                    className="sticky top-30 hidden xl:flex xl:max-w-[305px] self-start"
                    authorName={post.author}
                />
            </div>

            {/* ⭐ render เฉพาะตอนยังไม่ login */}
            {!isAuthenticated && (
                <CreateAccountAlert
                    alertState={isAlertOpen}
                    setAlertState={setIsAlertOpen}
                />
            )}
        </div>
    );
}