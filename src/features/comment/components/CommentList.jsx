import CommentItem from "./CommentItem";

function CommentList({ comments }) {
  return (
    <div className="flex flex-col gap-6">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList;
