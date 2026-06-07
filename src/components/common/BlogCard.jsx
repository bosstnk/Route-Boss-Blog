import imageProfile from "@/assets/images/picture-profile.jpg";
import { formatDate } from "@/utils/formatDate";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export function BlogCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <Skeleton className="h-[212px] sm:h-[360px] w-full rounded-2xl bg-base-brown-300" />
      <div className="flex flex-col items-start gap-2 flex-1">
        <Skeleton className="h-7 w-20 rounded-full bg-base-brown-300" />
        <Skeleton className="h-7 w-3/4 bg-base-brown-300" />
        <Skeleton className="h-4 w-full bg-base-brown-300" />
        <Skeleton className="h-4 w-5/6 bg-base-brown-300" />
        <div className="flex items-center text-body-2 mt-2">
          <Skeleton className="w-8 h-8 rounded-full mr-2 bg-base-brown-300" />
          <Skeleton className="h-4 w-24 bg-base-brown-300" />
          <span className="text-base-brown-300 mx-4 text-xl font-light">|</span>
          <Skeleton className="h-4 w-20 bg-base-brown-300" />
        </div>
      </div>
    </div>
  );
}

export function BlogCard({ post }) {
  const navigate = useNavigate()
  const { id, title, author, author_pic, category, description, image, date } = post

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <button
        className="
          h-[212px] sm:h-[360px]
          transition-all duration-300 ease-out cursor-pointer
          hover:-translate-y-2
          hover:shadow-[0_16px_32px_rgba(38,35,30,0.12)]
          rounded-2xl
        "
        onClick={() => navigate(`/post/${id}`)}
      >
        <img
          className="w-full h-full object-cover rounded-2xl"
          src={image}
          alt={title}
        />
      </button>

      <div className="flex flex-col items-start gap-2 flex-1">
        <span className="bg-brand-green-soft rounded-full px-3 py-1 text-body-2 text-brand-green">
          {category}
        </span>
        <h4
          className="text-base-brown-600 text-headline-4 line-clamp-2 cursor-pointer hover:underline"
          onClick={() => navigate(`/post/${id}`)}
        >
          {title}
        </h4>
        <p className="text-base-brown-400 text-body-2 grow line-clamp-2">
          {description}
        </p>
        <div className="flex items-center text-body-2 mt-2">
          <img
            className="w-8 h-8 rounded-full object-cover mr-2"
            src={author_pic || imageProfile}
            alt={author}
          />
          <span className="text-base-brown-500">{author}</span>
          <span className="text-base-brown-300 mx-4 text-xl font-light">|</span>
          <span className="text-base-brown-400">{formatDate(date)}</span>
        </div>
      </div>
    </div>
  )
}