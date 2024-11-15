import React, { useState } from "react";
import { HiOutlineArrowRight, HiOutlineTrash } from "react-icons/hi2";
import ShowDate from "./ShowDate";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";
import { bouncy } from "ldrs";
import { Link } from "react-router-dom";

bouncy.register();

const VoucherListRow = ({
  voucher: { id, voucher_id, customer_name, customer_email, sale_date },
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate } = useSWRConfig();

  const handleDeleteBtn = async () => {
    setIsDeleting(true);
    await fetch(import.meta.env.VITE_API_URL + `/vouchers/${id}`, {
      method: "DELETE",
    });
    toast.success(`Voucher deleted successful`);
    mutate(import.meta.env.VITE_API_URL + `/vouchers`);
  };

  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4">{voucher_id}</td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {customer_name}
      </th>
      <td className="px-6 py-4 text-end">{customer_email}</td>
      <td className="px-6 py-4 text-end">
        <ShowDate timestamp={sale_date} />
      </td>
      <td className="px-6 py-4 text-end">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            onClick={handleDeleteBtn}
            type="button"
            className="size-10 flex justify-center items-center text-sm font-medium text-red-600 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            {isDeleting ? (
              <l-bouncy size="20" speed="1.75" color="red"></l-bouncy>
            ) : (
              <HiOutlineTrash />
            )}
          </button>
          <Link
            to={`/voucher/detail/${id}`}
            className="size-10 flex justify-center items-center text-sm font-medium bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            <HiOutlineArrowRight />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default VoucherListRow;
