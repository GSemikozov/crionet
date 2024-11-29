import { Skeleton } from '@/components/ui/skeleton';

export const CountriesListSkeleton = () => {
  return Array(6)
    .fill(0)
    .map((_, index) => (
      <div key={index} className="border rounded-lg p-4">
        <Skeleton className="h-[50px] w-[100px] mb-2" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-1" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ));
};
