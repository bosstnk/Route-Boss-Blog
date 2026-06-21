import { Skeleton } from "@/shared/components/ui/skeleton";

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

export default BlogCardSkeleton;
