import React from "react";
import Container from "../components/Container";
import useCookie from "react-use-cookie";
import BreadCrumb from "../components/BreadCrumb";
import { HiLockOpen, HiPencilSquare } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const UserProfilePage = () => {
  // const [userCookie] = useCookie("user");
  // const { name, email, profile_image } = JSON.parse(userCookie);

  const {
    user: { name, email, profile_image },
  } = useUserStore();
  return (
    <section>
      <Container>
        <BreadCrumb currentPageTitle={"User Profile"} />
        <div className="border p-10 flex flex-col gap-5">
          <div className="flex items-end space-x-4">
            <div className="relative">
              <img
                className="size-32 rounded-lg"
                src={
                  profile_image
                    ? profile_image
                    : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                }
                alt="user phtoto"
              />
              <Link
                to={"user-change-image"}
                className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white hover:bg-blue-900 size-6 rounded-full flex justify-center items-center"
              >
                <HiPencilSquare size={10} />
              </Link>
            </div>
            <div>
              <span className="mb-2 inline-block rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                Your Name
              </span>
              <div className="flex gap-3 items-center">
                <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">
                  {name}
                </h2>
                <Link
                  to={"user-change-name"}
                  className="bg-blue-600 text-white hover:bg-blue-900 size-6 rounded-full flex justify-center items-center"
                >
                  <HiPencilSquare size={10} />
                </Link>
              </div>
            </div>
          </div>
          <dl>
            <div className="flex gap-3 items-center">
              <dt className="font-semibold text-gray-900 dark:text-white">
                Email Address
              </dt>
            </div>
            <dd className="text-gray-500 dark:text-gray-400">{email}</dd>
          </dl>
          <button
            type="button"
            className="inline-flex gap-3  items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
          >
            <HiLockOpen />
            Change Password
          </button>
        </div>
      </Container>
    </section>
  );
};

export default UserProfilePage;
