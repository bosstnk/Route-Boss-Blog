import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import imageProfile from "@/assets/images/picture-profile.jpg"
import axios from "axios"
import {
    Facebook,
    Linkedin,
    Twitter,
    Smile,
    Copy,
    Loader2,
} from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import { Textarea } from "./ui/textarea";
import { Button } from "./common/Button";
import { comments } from "@/data/comments";

export default function ViewPost() {
    const [postInfo, setPostInfo] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const param = useParams()

    async function getPost() {
        setIsLoading(true)
        try {
            const response = await axios.get(`https://blog-post-project-api.vercel.app/posts/${param.postId}`)
            setPostInfo(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getPost()
    }, [])

    return (
        <div className="max-w-[1440px] mx-auto pb-10 md:px-8 md:pt-8 xl:px-[120px] xl:pt-[60px] xl:pb-[120px]">
            <img
                src={postInfo.image}
                alt={postInfo.title}
                className="md:rounded-lg object-cover w-full h-[200px] sm:h-[340px] md:h-[587px]"
            />
            <div className="flex flex-col xl:flex-row xl:gap-20 xl:mt-12">
                <div>
                    <article className="px-4 py-6 xl:pt-0 xl:px-0">
                        <div className="flex gap-4">
                            <span className="bg-brand-green-soft rounded-full px-3 py-1 text-body-2 text-brand-green">
                                {postInfo.category}
                            </span>
                            <span className="py-1 text-body-1 text-base-brown-400">
                                {formatDate(postInfo.date)}
                            </span>
                        </div>
                        <h1 className="text-headline-3 mt-4 leading-8">{postInfo.title}</h1>
                        <p className="mt-6 mb-10">{postInfo.description}</p>
                        <div className="markdown">
                            <ReactMarkdown>{postInfo.content}</ReactMarkdown>
                        </div>
                    </article>
                    <div className="xl:hidden px-4 pb-10">
                        <AuthorProfile />
                    </div>
                    <div className="md:px-4 xl:p-0">
                        <Share likeAmount={postInfo.likes} />
                    </div>
                    <Comments />
                </div>
                <div className="hidden xl:block xl:max-w-[305px]">
                    <AuthorProfile />
                </div>
            </div>
        </div >
    )
}

function LoadingScreen() {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center">
                <Loader2 className="w-16 h-16 animate-spin text-foreground" />
                <p className="mt-4 text-lg font-semibold">Loading...</p>
            </div>
        </div>
    );
}

function AuthorProfile() {
    return (
        <div className="bg-base-brown-200 rounded-2xl p-6 flex flex-col gap-5">
            <div className="flex gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden">
                    <img src={imageProfile} alt="image profile" className="object-cover w-full h-full" />
                </div>
                <div>
                    <p className="text-body-3 text-base-brown-400">Author</p>
                    <h4 className="text-headline-4 text-base-brown-500">Thompson P.</h4>
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

function Share({ likeAmount }) {
    return (
        <div className="bg-base-brown-200 flex flex-col gap-6 p-4 md:flex-row md:justify-between md:rounded-2xl xl:px-6">
            <button className="bg-white flex items-center justify-center gap-1.5 px-10 py-3 rounded-full border border-base-brown-400">
                <Smile size={24} color="#43403B" />
                <span className="text-body-1 text-base-brown-600">{likeAmount}</span>
            </button>
            <div className="flex gap-2 md:gap-3">
                <button className="bg-white flex items-center justify-center grow gap-1.5 px-7 py-3 rounded-full border border-base-brown-400">
                    <Copy size={24} color="#26231E" />
                    <span className="text-body-1 text-base-brown-600">Copy link</span>
                </button>
                <a href="#" className="bg-white p-3 rounded-full border border-base-brown-400">
                    <Facebook />
                </a>
                <a href="#" className="bg-white p-3 rounded-full border border-base-brown-400">
                    <Linkedin />
                </a>
                <a href="#" className="bg-white p-3 rounded-full border border-base-brown-400">
                    <Twitter />
                </a>
            </div>
        </div>
    )
}

function Comments() {
    return (
        <div className="px-4 pt-6">
            <div className="flex flex-col gap-3">
                <p className="text-body-1 text-base-brown-400">Comment</p>
                <Textarea placeholder="What are your thoughts?" className="w-full h-24 rounded-lg border-base-brown-300 placeholder:text-base-brown-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"></Textarea>
                <div className="flex justify-end">
                    <Button variant="primary" text="Send" />
                </div>

            </div>
            <div className="flex flex-col gap-6 mt-11">
                {comments.map((comment, index) => (
                    <div className="flex flex-col gap-4" key={index}>
                        <div className="flex gap-3">
                            <div className="w-11 h-11 rounded-full overflow-hidden">
                                <img src={comment.image} alt="image profile" className="object-cover w-full h-full" />
                            </div>
                            <div>
                                <h4 className="text-headline-4 text-base-brown-500">{comment.name}</h4>
                                <p className="text-body-3 text-base-brown-400">{comment.date}</p>
                            </div>
                        </div>
                        <p className="text-body-1 text-base-brown-400">
                            {comment.comment}
                        </p>
                        {index < comments.length - 1 && (
                            <hr className="border-base-brown-300 mt-2" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}