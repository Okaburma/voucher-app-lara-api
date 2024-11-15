import React from "react";

const VoucherListRowSkeletonLoader = () => {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse w-8"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse w-32"></div>
      </td>
      <td className="px-6 py-4 text-end">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse w-400"></div>
      </td>
      <td className="px-6 py-4 ">
        <div className="space-y-2 flex flex-col items-end">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 animate-pulse w-40"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 animate-pulse w-20"></div>
        </div>
      </td>
      <td className="px-6 py-4 text-end">
        <div className="inline-flex">
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        </div>
      </td>
    </tr>
  );
};

export default VoucherListRowSkeletonLoader;
