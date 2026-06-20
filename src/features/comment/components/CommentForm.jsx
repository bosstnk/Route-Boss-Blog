import useCreateComment from "@/features/comment/hooks/useCreateComment";
import Button from "@/components/common/Button";

function CommentForm({ postId, refetch, onRequireAuth }) {
  const {
    comment,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useCreateComment(postId, refetch);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-body-1 text-base-brown-400">Comment</p>

      <textarea
        value={comment}
        onChange={handleChange}
        onFocus={() => {
          const isGuest = onRequireAuth();
          if (isGuest) return;
        }}
        placeholder="What are your thoughts?"
        className="w-full h-24 p-3 pl-4 bg-white rounded-lg border border-base-brown-300 outline-none resize-none text-body-1 text-base-brown-500 placeholder:text-base-brown-400 transition-colors focus:ring-1 focus:border-base-brown-400 focus:ring-base-brown-300"
      />

      <Button
        variant="primary"
        className="self-end"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send"}
      </Button>
    </div>
  );
}

export default CommentForm;
