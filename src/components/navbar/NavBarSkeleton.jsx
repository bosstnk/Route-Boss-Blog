import { Skeleton } from "@/components/ui/skeleton";

export function NavBarSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-12 w-12 rounded-full bg-[#dad6d1]" />
      <Skeleton className="h-6 w-[120px] bg-[#dad6d1]" />
    </div>
  );
}

export default NavBarSkeleton;
