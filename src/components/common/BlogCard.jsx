import imageProfile from "@/assets/images/picture-profile.jpg";
import { formatDate } from "@/utils/formatDate";
import { useNavigate } from "react-router-dom";

export function BlogCard({ post }) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-4 sm:gap-6 ">
      <button className="relative h-[212px] sm:h-[360px]" onClick={() => navigate(`/post/${post.id}`)}>
        <img
          className="w-full h-full object-cover rounded-2xl"
          src={post.image}
          alt={post.title}
        />
      </button>
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex">
          <span className="bg-brand-green-soft rounded-full px-3 py-1 text-body-2 text-brand-green">
            {post.category}
          </span>
        </div>
        <button onClick={() => navigate(`/post/${post.id}`)}>
          <h2 className="text-start text-base-brown-600 text-headline-4 line-clamp-2 cursor-pointer hover:underline">
            {post.title}
          </h2>
        </button>
        <p className="text-base-brown-400 text-body-2 grow line-clamp-3">
          {post.description}
        </p>
        <div className="flex items-center text-body-2 mt-2">
          <img
            className="w-8 h-8 rounded-full mr-2"
            src={imageProfile}
            alt={post.author}
          />
          <span className="text-base-brown-500">{post.author}</span>
          <span className="mx-2 text-base-brown-300">|</span>
          <span className="text-base-brown-400">{formatDate(post.date)}</span>
        </div>
      </div>
    </div>
  );
}
