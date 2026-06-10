import imageProfile from "@/assets/images/picture-profile.jpg";
import { formatDate } from "@/utils/formatDate";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export function BlogCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl">
      <Skeleton className="h-[212px] sm:h-[360px] w-full rounded-t-2xl bg-base-brown-300" />

      <div
        className="
          flex flex-col items-start gap-2 flex-1
          border-x border-b border-base-brown-400/20
          rounded-b-2xl
          p-4 sm:pt-6
        "
      >
        <Skeleton className="h-7 w-20 rounded-full bg-base-brown-300" />

        <Skeleton className="h-7 w-3/4 bg-base-brown-300" />
        <Skeleton className="h-7 w-1/2 bg-base-brown-300" />

        <Skeleton className="h-4 w-full bg-base-brown-300" />
        <Skeleton className="h-4 w-5/6 bg-base-brown-300" />

        <div className="h-px w-full bg-base-brown-200 my-4" />

        <div className="flex items-center w-full">
          <Skeleton className="h-8 w-8 rounded-full mr-2.5 bg-base-brown-300" />
          <Skeleton className="h-4 w-24 bg-base-brown-300" />
          <Skeleton className="h-4 w-20 ml-auto bg-base-brown-300" />
        </div>
      </div>
    </div>
  );
}

export function BlogCard({ post }) {
  const navigate = useNavigate();

  const {
    id,
    title,
    author,
    author_pic,
    category,
    description,
    image,
    date,
  } = post;

  return (
    <div
      className="
        group
        flex flex-col rounded-2xl
        transition-all duration-300 ease-out
        hover:-translate-y-2
        hover:shadow-[0_16px_32px_rgba(38,35,30,0.12)]
        cursor-pointer
      "
      onClick={() => navigate(`/post/${id}`)}
    >
      <button
        className="
          h-[212px] sm:h-[360px]
          overflow-hidden rounded-t-2xl
          cursor-pointer
        "
      >
        <img
          src={image}
          alt={title}
          className="
            w-full h-full object-cover
            transition-transform duration-500 ease-out
            group-hover:scale-105
          "
        />
      </button>

      <div
        className="
          flex flex-col items-start gap-2 flex-1
          border-x border-b border-base-brown-400/20
          rounded-b-2xl
          p-4 sm:pt-6
        "
      >
        <span
          className="
            bg-brand-green-soft
            rounded-full
            px-3 py-1
            text-body-2
            text-brand-green
          "
        >
          {category}
        </span>

        <h4
          className="
            text-headline-4
            text-base-brown-600
            line-clamp-2
            cursor-pointer
            hover:text-brand-green transition-colors
          "
        >
          {title}
        </h4>

        <p
          className="
            grow
            line-clamp-2
            text-body-2
            text-base-brown-400
          "
        >
          {description}
        </p>

        <div className="h-px w-full bg-base-brown-300 my-4" />

        <div className="flex items-center text-body-2 w-full">
          <img
            src={author_pic || imageProfile}
            alt={author}
            className="
              mr-2.5
              h-8 w-8
              rounded-full
              object-cover
            "
          />

          <span className="text-base-brown-500">
            {author}
          </span>
          <span className="text-base-brown-400 ml-auto">
            {formatDate(date)}
          </span>
        </div>
      </div>
    </div>
  );
}