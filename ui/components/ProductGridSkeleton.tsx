interface ProductGridSkeletonProps {
  count?: number;
}

const ProductGridSkeleton = ({ count = 12 }: ProductGridSkeletonProps) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="h-40 bg-gray-200 animate-pulse rounded " />
    ))}
  </div>
);

export default ProductGridSkeleton;