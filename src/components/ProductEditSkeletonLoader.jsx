import React from "react";

const ProductEditSkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      {/* Skeleton for Product Name */}
      <div className="mb-4">
        <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>

      {/* Skeleton for Product Price */}
      <div className="mb-4">
        <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>

      {/* Skeleton for Checkboxes */}
      <div className="mb-4">
        <div className="h-5 bg-gray-200 rounded w-4 inline-block mr-2"></div>
        <div className="h-4 bg-gray-300 rounded w-32 inline-block"></div>
      </div>

      <div className="mb-4">
        <div className="h-5 bg-gray-200 rounded w-4 inline-block mr-2"></div>
        <div className="h-4 bg-gray-300 rounded w-48 inline-block"></div>
      </div>

      {/* Skeleton for Buttons */}
      <div className="flex gap-4">
        <div className="h-10 bg-gray-300 rounded-lg w-24"></div>
        <div className="h-10 bg-gray-300 rounded-lg w-36"></div>
      </div>
    </div>
  );
};

export default ProductEditSkeletonLoader;
