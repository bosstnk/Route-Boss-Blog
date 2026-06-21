function CommentItem({ comment }) {
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
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
  );
}

export default CommentItem;
