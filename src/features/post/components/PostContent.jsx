import ReactMarkdown from "react-markdown";
import { formatDate } from "@/utils/formatDate";

function PostContent({ post }) {
  return (
    <article className="px-4 pt-6 pb-10 space-y-6 xl:pt-0 xl:px-0">
      <div>
        <div className="flex gap-4 items-center">
          <span className="bg-brand-green-soft rounded-full px-3 py-1 text-body-2 text-brand-green">
            {post.category}
          </span>
          <span className="text-body-1 text-base-brown-400">
            {formatDate(post.date)}
          </span>
        </div>
        <h1 className="text-headline-3 mt-4 leading-8">
          {post.title}
        </h1>
      </div>

      <div>
        <p className="mb-10">{post.description}</p>
        <div className="markdown">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}

export default PostContent;
