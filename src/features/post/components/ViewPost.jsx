import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { CommentSection, useComments } from "@/features/comment";
import LikeShare from "./LikeShare";
import AuthorProfile from "./AuthorProfile";
import usePost from "@/features/post/hooks/usePost";
import useToggleLike from "@/features/post/hooks/useToggleLike";
import LoadingScreen from "@/components/common/LoadingScreen";
import PostContent from "./PostContent";
import ModalGuest from "@/components/common/ModalGuest";


export default function ViewPost() {

    const { postId } = useParams();
    const navigate = useNavigate();
    const { post, setPost, isLoading } = usePost(postId);
    const { toggleLike } = useToggleLike(postId, setPost);
    const { isAuthenticated } = useAuth();
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const { comments, refetch } = useComments(postId);
    if (isLoading || !post) return <LoadingScreen />;
    const openAlertIfGuest = () => {
        if (!isAuthenticated) {
            setIsAlertOpen(true);
            return true;
        }
        return false;
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
                    <AuthorProfile
                        className="xl:hidden"
                        authorName={post.author}
                        authorPic={post.author_pic}
                        authorBio={post.author_bio}
                    />
                    <LikeShare
                        liked={post.liked}
                        likeAmount={post.likes_count}
                        onRequireAuth={openAlertIfGuest}
                        onLike={toggleLike}
                    />
                    <CommentSection
                        postId={postId}
                        comments={comments}
                        refetch={refetch}
                        onRequireAuth={openAlertIfGuest}
                    />
                </div>
                <AuthorProfile
                    className="sticky top-30 hidden xl:flex xl:max-w-[305px] self-start"
                    authorName={post.author}
                    authorPic={post.author_pic}
                    authorBio={post.author_bio}
                />
            </div>
            {!isAuthenticated && (

                <ModalGuest
                    open={isAlertOpen}
                    onClose={() => setIsAlertOpen(false)}
                    onConfirm={() => navigate("/signup")}
                    onLogin={() => navigate("/login")}
                />
            )}
        </div>
    );
}