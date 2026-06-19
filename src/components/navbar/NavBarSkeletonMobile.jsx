import { Skeleton } from "@/components/ui/skeleton";

export function NavBarSkeletonMobile() {
  return (
    <div className="flex flex-col items-center gap-1">
      <Skeleton className="h-[4px] w-[24px] bg-[#dad6d1]" />
      <Skeleton className="h-[4px] w-[24px] bg-[#dad6d1]" />
      <Skeleton className="h-[4px] w-[24px] bg-[#dad6d1]" />
    </div>
  );
}

export default NavBarSkeletonMobile;
