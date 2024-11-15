import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SaleForm from "./SaleForm";
import VoucherTable from "./VoucherTable";
import useRecordStore from "../store/useRecordStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VoucherInfo = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [isSending, setIsSending] = useState(false);

  const { records, resetRecord } = useRecordStore();

  const generateInvoiceNumber = () => {
    const now = Date.now().toString(); // Get the current timestamp in milliseconds
    const random = Math.floor(Math.random() * 1000).toString(); // Generate a random 3-digit number
    return `INV-${now}-${random}`; // Combine timestamp and random number to create a unique invoice number
  };

  const onSubmit = async (data) => {
    setIsSending(true);
    const total = records.reduce((a, b) => a + b.cost, 0);
    const tax = total * 0.07;
    const net_total = total + tax;
    const currentVoucher = { ...data, records, total, tax, net_total };
    // console.log(currentVoucher);
    /* api ဆီ data လှမ်းထည့် */
    const res = await fetch(import.meta.env.VITE_API_URL + "/vouchers", {
      method: "POST",
      body: JSON.stringify(currentVoucher),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // console.log(res);
    const json = await res.json();

    if (res.status === 201) {
      toast.success("Voucher created successfully");
      resetRecord();
      reset();
      setIsSending(false);
      if (data.redirect_to_detail) {
        navigate(`/voucher/detail/${json.id}`);
      }
    } else {
      toast.error(json.message);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-5">
      <div className="col-span-3">
        <SaleForm />

        <VoucherTable />
      </div>
      <div className="col-span-1">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-full"
          id="infoForm"
        >
          <div className="grid grid-cols-1 gap-5 mb-10">
            <div className="col-span-1">
              <label
                className={`block mb-2 text-sm font-medium  dark:text-white ${
                  errors.voucher_id ? "text-red-500" : "text-gray-900"
                }`}
              >
                Voucher ID
              </label>
              <input
                defaultValue={generateInvoiceNumber()}
                {...register("voucher_id", {
                  required: true,
                  min: 2,
                })}
                type="text"
                placeholder="eg.V121212"
                className={`bg-gray-50 border ${
                  errors.voucher_id
                    ? "border-red-500  focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300  focus:ring-blue-500 focus:border-blue-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              `}
              />
              {errors.voucher_id?.type === "required" && (
                <p className="text-red-500 text-sm m-1">
                  Voucher ID is required
                </p>
              )}
              {errors.voucher_id?.type === "min" && (
                <p className="text-red-500 text-sm m-1">
                  Voucher ID must be at least 2 characters
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label
                className={`block mb-2 text-sm font-medium  dark:text-white ${
                  errors.customer_name ? "text-red-500" : "text-gray-900"
                }`}
              >
                Customer Name
              </label>
              <input
                {...register("customer_name", {
                  required: true,
                })}
                type="text"
                placeholder="eg.Kyaw Kyaw"
                className={`bg-gray-50 border ${
                  errors.customer_name
                    ? "border-red-500  focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300  focus:ring-blue-500 focus:border-blue-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              `}
              />
              {errors.customer_name?.type === "required" && (
                <p className="text-red-500 text-sm m-1">
                  Customer Name is required
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label
                className={`block mb-2 text-sm font-medium  dark:text-white ${
                  errors.customer_email ? "text-red-500" : "text-gray-900"
                }`}
              >
                Customer Email
              </label>
              <input
                {...register("customer_email", {
                  required: true,
                })}
                type="text"
                placeholder="eg.kyawkyaw@gmail.com"
                className={`bg-gray-50 border ${
                  errors.customer_email
                    ? "border-red-500  focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300  focus:ring-blue-500 focus:border-blue-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              `}
              />
              {errors.customer_email?.type === "required" && (
                <p className="text-red-500 text-sm m-1">
                  Customer Email is required
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label
                className={`block mb-2 text-sm font-medium  dark:text-white ${
                  errors.sale_date ? "text-red-500" : "text-gray-900"
                }`}
              >
                Sale Date
              </label>
              <input
                defaultValue={new Date().toISOString().slice(0, 10)}
                {...register("sale_date", {
                  required: true,
                })}
                type="date"
                placeholder="eg.1 Sept 2024"
                className={`bg-gray-50 border ${
                  errors.sale_date
                    ? "border-red-500  focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300  focus:ring-blue-500 focus:border-blue-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              `}
              />
              {errors.sale_date?.type === "required" && (
                <p className="text-red-500 text-sm m-1">
                  Sale date is required
                </p>
              )}
            </div>
          </div>
          <div className="mt-auto flex flex-col justify-end items-end gap-3">
            <div className="flex gap-1 items-center">
              <label
                htmlFor="redirect_to_detail"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Redirect to Voucher Detail
              </label>
              <input
                form="infoForm"
                {...register("redirect_to_detail")}
                id="redirect_to_detail"
                type="checkbox"
                defaultValue
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="flex gap-1 items-center">
              <label
                htmlFor="all_correct"
                className="ms-2 text-nowrap text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Make sure all fields are correct
              </label>
              <input
                form="infoForm"
                required
                {...register("all_correct")}
                id="all_correct"
                type="checkbox"
                defaultValue
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <button
              form="infoForm"
              type="submit"
              className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Confirm Voucher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoucherInfo;
