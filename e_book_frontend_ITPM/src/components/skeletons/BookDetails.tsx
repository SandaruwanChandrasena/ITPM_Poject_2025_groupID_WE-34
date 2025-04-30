import { Divider, Skeleton } from "@nextui-org/react";

const BookDetails = () => {
  return (
    <div className="md:flex">
      <div className="">
        <div className="">
          <Skeleton className="object-cover w-48 rounded-md h-80" />
        </div>
      </div>

      <div className="flex-1 pt-6 md:pt-0 md:pl-10">
        <Skeleton className="w-1/2 h-4 rounded" />
        <div className="mt-3 space-y-2">
          <Skeleton className="w-24 h-4 rounded" />
          <Skeleton className="w-20 h-4 rounded" />
        </div>

        <div className="flex items-center mt-3 space-x-1 font-semibold">
          <Skeleton className="w-20 h-4 rounded" />
        </div>

        <div className="mt-6 space-y-3">
          <Skeleton className="h-4 rounded" />
          <Skeleton className="h-4 rounded" />
          <Skeleton className="w-1/2 h-4 rounded" />
        </div>

        <div className="flex items-center h-10 mt-6 space-x-6">
          <Skeleton className="w-8 h-8 rounded" />

          <Divider orientation="vertical" className="h-1/2" />

          <Skeleton className="w-8 h-8 rounded" />

          <Divider orientation="vertical" className="h-1/2" />

          <Skeleton className="w-8 h-8 rounded" />

          <Divider orientation="vertical" className="h-1/2" />

          <Skeleton className="w-8 h-8 rounded" />
        </div>

        <div className="flex items-center mt-6 space-x-3">
          <Skeleton className="w-20 h-8 rounded" />
          <Skeleton className="w-20 h-8 rounded" />
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
