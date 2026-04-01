import { Textarea } from "../ui/textarea";
import useCreateComment from "@/hooks/Comment/useCreateComment";

function Comments({ comments, postId, refetch, onRequireAuth }) {

  const {
    comment,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useCreateComment(postId, refetch);

  return (
    <div className="px-4 pt-6 pb-10 space-y-11">

      <div className="flex flex-col gap-3">

        <p className="text-body-1 text-base-brown-400">Comment</p>

        <Textarea
          value={comment}
          onChange={handleChange}
          onFocus={() => {
            const isGuest = onRequireAuth();
            if (isGuest) return;
          }}
          placeholder="What are your thoughts?"
          className="w-full h-24 rounded-lg border-base-brown-300 placeholder:text-base-brown-400 focus-visible:ring-1 focus-visible:ring-base-brown-300 focus-visible:border-base-brown-400"
        />

        <Button
          variant="primary"
          text={isSubmitting ? "Sending..." : "Send"}
          className="self-end"
          onClick={handleSubmit}
          disabled={isSubmitting}
        />

      </div>

      <div className="flex flex-col gap-6">

        {comments.map((comment) => (

          <div className="flex flex-col gap-4 lg:gap-6" key={comment.id}>

            <div className="flex gap-3">

              <div className="w-11 h-11 rounded-full overflow-hidden">
                <img
                  src={comment.profile_pic || "/default-avatar.png"}
                  alt="profile"
                  className="object-cover w-full h-full"
                />
              </div>

              <div>
                <h4 className="text-headline-4 text-base-brown-500">
                  {comment.name}
                </h4>

                <p className="text-body-3 text-base-brown-400">
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </div>

            </div>

            <p className="text-body-1 text-base-brown-400">
              {comment.comment_text}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Comments;