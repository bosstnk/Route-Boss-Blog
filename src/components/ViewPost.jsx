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
    X,
} from "lucide-react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { formatDate } from "@/utils/formatDate";
import { Textarea } from "./ui/textarea";
import { Button } from "./common/Button";
import { comments } from "@/data/comments";

export default function ViewPost() {
    const [postInfo, setPostInfo] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const param = useParams()

    async function getPost() {
        setIsLoading(true)
        try {
            const response = await axios.get(`https://blog-post-project-api.vercel.app/posts/${param.postId}`)
            setPostInfo(response.data)
            // รอ 3 วินาทีก่อนซ่อน loading
            await new Promise(resolve => setTimeout(resolve, 1900))
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getPost()
    }, [])

    if (isLoading) {return <LoadingScreen/>}

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
                        <Share likeAmount={postInfo.likes} setAlertState={setIsAlertOpen} />
                    </div>
                    <Comments setAlertState={setIsAlertOpen} />
                </div>
                <div className="sticky top-30 hidden xl:block xl:max-w-[305px] self-start">
                    <AuthorProfile />
                </div>
            </div>
            <CreateAccountAlert alertState={isAlertOpen} setAlertState={setIsAlertOpen} />
        </div >
    )
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

function Share({ likeAmount, setAlertState }) {
    const shareLink = encodeURI(window.location.href);
    return (
        <div className="bg-base-brown-200 flex flex-col gap-6 p-4 md:flex-row md:justify-between md:rounded-2xl xl:px-6">
            <button className="bg-white flex items-center justify-center gap-1.5 px-10 py-3 rounded-full border border-base-brown-400" onClick={() => setAlertState(true)}>
                <Smile size={24} color="#43403B" />
                <span className="text-body-1 text-base-brown-600">{likeAmount}</span>
            </button>
            <div className="flex gap-2 md:gap-3">
                <button
                    className="bg-white flex items-center justify-center grow gap-1.5 px-7 py-3 rounded-full border border-base-brown-400"
                    onClick={() => {
                        navigator.clipboard.writeText(shareLink);
                        toast.custom((t) => (
                            <div className="bg-green-500 text-white p-4 rounded-lg flex justify-between items-start max-w-md w-full">
                                <div>
                                    <h2 className="font-bold text-lg mb-1">Copied!</h2>
                                    <p className="text-sm">
                                        This article has been copied to your clipboard.
                                    </p>
                                </div>
                                <button
                                    onClick={() => toast.dismiss(t)}
                                    className="text-white hover:text-gray-200"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        ));
                    }}>
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

function Comments({ setAlertState }) {
    return (
        <div className="px-4 pt-6">
            <div className="flex flex-col gap-3">
                <p className="text-body-1 text-base-brown-400">Comment</p>
                <Textarea
                    onFocus={() => setAlertState(true)}
                    placeholder="What are your thoughts?"
                    className="w-full h-24 rounded-lg border-base-brown-300 placeholder:text-base-brown-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground">
                </Textarea>
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


function CreateAccountAlert({ alertState, setAlertState }) {
    return (
        <AlertDialog open={alertState} onOpenChange={setAlertState}>
            <AlertDialogContent className="flex flex-col items-center gap-0 bg-base-brown-100 px-4 pt-4 pb-10 lg:max-w-[621px] rounded-2xl">
                <AlertDialogTitle className="text-headline-3 text-center pt-12 pb-4">Create an account to Continue</AlertDialogTitle>
                <Button variant="primary" text="Create Account"></Button>
                <AlertDialogDescription className="flex flex-row gap-3 justify-center pt-4 text-body-1 text-base-brown-400">
                    Already have an account?
                    <a
                        href="/login"
                        className="text-foreground hover:text-muted-foreground transition-colors underline font-semibold"
                    >
                        <Button variant="text" text="Log in"></Button>
                    </a>
                </AlertDialogDescription>
                <AlertDialogCancel className="absolute right-4 top-2 bg-base-brown-100 border-none shadow-none">
                    <X size={24} />
                </AlertDialogCancel>
            </AlertDialogContent>
        </AlertDialog>
    )
}

function LoadingScreen() {
    return (
        <div className="h-screen inset-0 flex items-center justify-center">
{/*             <div className="flex flex-col items-center">
                <Loader2 className="w-16 h-16 animate-spin text-foreground" />
                <p className="mt-4 text-lg font-semibold">Loading...</p>
            </div> */}
            <div class="loader"></div>
        </div>
    );
}