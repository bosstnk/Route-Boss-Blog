import { comments } from "@/data/comments"
import { Textarea } from "../ui/textarea";
import { Button } from "../common/Button";

function Comments({ setAlertState }) {
    return (
        <div className="px-4 pt-6 pb-10 space-y-11">
            <div className="flex flex-col gap-3">
                <p className="text-body-1 text-base-brown-400">Comment</p>
                <Textarea
                    onFocus={() => setAlertState(true)}
                    placeholder="What are your thoughts?"
                    className="w-full h-24 rounded-lg border-base-brown-300 placeholder:text-base-brown-400 focus-visible:ring-1 focus-visible:ring-base-brown-300 focus-visible:border-base-brown-400">
                </Textarea>
                <Button variant="primary" text="Send" className="self-end"/>
            </div>
            <div className="flex flex-col gap-6">
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

export default Comments;