import imageProfile from "@/assets/images/picture-profile.jpg"
import { formatDate } from "@/utils/formatDate";

export function BlogCard({post}) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <a href="#" className="relative h-[212px] sm:h-[360px]">
        <img
          className="w-full h-full object-cover rounded-2xl"
          src={post.image}
          alt={post.title}
        />
      </a>
      <div className="flex flex-col items-start gap-2">
        <span className="bg-brand-green-soft rounded-full px-3 py-1 text-body-2 text-brand-green">
          {post.category}
        </span>
        <a href="#">
          <h2 className="text-base-brown-600 text-start text-headline-4 line-clamp-2 hover:underline">
            {post.title}
          </h2>
        </a>
        <p className="text-base-brown-400 text-body-2 flex-grow line-clamp-3">
          {post.description}
        </p>
        <div className="mt-2 flex flex-row items-center text-body-2">
          <img
            className="w-6 h-6 rounded-full mr-2"
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
