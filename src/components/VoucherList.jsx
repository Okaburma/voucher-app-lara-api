import React, { useRef, useState } from "react";
import { HiSearch, HiX } from "react-icons/hi";
import { HiComputerDesktop } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useSWR from "swr";
import VoucherListRow from "./VoucherListRow";
import VoucherListRowSkeletonLoader from "./VoucherListRowSkeletonLoader";
import { debounce } from "lodash";
import Pagination from "./Pagination";
import VoucherListEmptyStage from "./VoucherListEmptyStage";

const fetcher = (url) => fetch(url).then((res) => res.json());
const VoucherList = () => {
  const searchInput = useRef("");
  const [search, setSearch] = useState();
  const [fetchUrl, setFetchUrl] = useState(
    import.meta.env.VITE_API_URL + "/vouchers"
  );
  const { data, isLoading, error } = useSWR(
    search ? `${import.meta.env.VITE_API_URL}/vouchers?q=${search}` : fetchUrl,
    fetcher
  );

  const handleSearch = debounce((e) => {
    setSearch(e.target.value);
  }, 500);

  const handleClearSearch = () => {
    searchInput.current.value = "";
    setSearch("");
  };

  const updateFetchUrl = (url) => {
    setFetchUrl(url);
  };

  // if (isLoading) return <p>Loading....</p>;
  // console.log(data);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <HiSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            ref={searchInput}
            onChange={handleSearch}
            type="text"
            id="input-group-1"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Voucher"
          />
          {search && (
            <button
              className="absolute right-2 top-0 m-auto bottom-0"
              onClick={handleClearSearch}
            >
              <HiX
                fill="red"
                className="scale-100 active:scale-90 duration-200"
              />
            </button>
          )}
        </div>
        <div className="">
          <Link
            to={"/sale"}
            className="text-white flex justify-center items-center gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Sale
            <HiComputerDesktop />
          </Link>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Customer name
              </th>

              <th scope="col" className="px-6 py-3 text-end">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                created at
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <VoucherListRowSkeletonLoader />
            ) : data?.data.length === 0 ? (
              <VoucherListEmptyStage />
            ) : (
              data?.data.map((voucher) => (
                <VoucherListRow key={voucher.id} voucher={voucher} />
              ))
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && (
        <Pagination
          links={data?.links}
          meta={data?.meta}
          updateFetchUrl={updateFetchUrl}
        />
      )}
    </div>
  );
};

export default VoucherList;
