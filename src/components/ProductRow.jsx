import React, { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import { useSWRConfig } from "swr";
import { Link } from "react-router-dom";
import ShowDate from "./ShowDate";
import toast from "react-hot-toast";
import { bouncy } from "ldrs";

bouncy.register();

const ProductRow = ({ product: { id, product_name, price, created_at,updated_at } }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate } = useSWRConfig();

  const handleDeleteBtn = async () => {
    setIsDeleting(true);
    const res = await fetch(import.meta.env.VITE_API_URL + `/products/${id}`, {
      method: "DELETE",
    });
    const json = await res.json();
    if (res.status === 200) {
      toast.success(json.message);
      mutate(import.meta.env.VITE_API_URL + `/products`);
    } else {
      toast.error(json.message);
    }
  };
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4">{id}</td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {product_name}
      </th>
      <td className="px-6 py-4 text-end">{price}</td>
      <td className="px-6 py-4 text-end">
        <ShowDate timestamp={created_at} />
      </td>
      <td className="px-6 py-4 text-end">
        <ShowDate timestamp={updated_at} />
      </td>
      <td className="px-6 py-4 text-end">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <Link
            to={`/product/edit/${id}`}
            type="button"
            className="size-10 flex justify-center items-center text-sm font-medium text-gray-600 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            <HiOutlinePencil />
          </Link>
          <button
            onClick={handleDeleteBtn}
            type="button"
            className="size-10 flex justify-center items-center text-sm font-medium text-red-600 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            {isDeleting ? (
              <l-bouncy size="20" speed="1.75" color="red"></l-bouncy>
            ) : (
              <HiOutlineTrash />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
