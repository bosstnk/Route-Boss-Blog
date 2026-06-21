import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function CommentSection({ comments, postId, refetch, onRequireAuth }) {
  return (
    <div className="px-4 pt-6 pb-10 space-y-11">
      <CommentForm
        postId={postId}
        refetch={refetch}
        onRequireAuth={onRequireAuth}
      />
      <CommentList comments={comments} />
    </div>
  );
}

export default CommentSection;
