import React from "react";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";

const Pagination = ({
  links: { prev, next },
  meta: { from, to, total },
  updateFetchUrl,
}) => {
  const handlePrevBtn = async () => {
    updateFetchUrl(prev);
  };
  const handleNextBtn = async () => {
    updateFetchUrl(next);
  };
  return (
    <div className="flex justify-between items-center px-6">
      {/* Help text */}
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing <b>{from}</b> to <b>{to}</b> of <b>{total}</b> Entries
      </span>
      {/* Buttons */}
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={handlePrevBtn}
          disabled={!prev}
          className="flex items-center justify-center size-10 text-sm font-medium text-stone-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:pointer-events-none"
        >
          <HiArrowLongLeft />
        </button>
        <button
          onClick={handleNextBtn}
          disabled={!next}
          className="flex items-center justify-center size-10 text-sm font-medium text-stone-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:pointer-events-none"
        >
          <HiArrowLongRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
