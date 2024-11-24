import React, { useRef } from "react";
import Container from "../components/Container";
import useCookie from "react-use-cookie";
import BreadCrumb from "../components/BreadCrumb";
import { HiCamera, HiLockOpen } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useUserStore from "../store/useUserStore";

const UserProfileChangeImage = () => {
  const [userCookie, setUserCookie] = useCookie("user");
  const { name, email, profile_image } = JSON.parse(userCookie);
  const [token] = useCookie("my_token");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user, setUser } = useUserStore();

  const fileInputRef = useRef();

  const handleUpdateImage = async (event) => {
    // console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append("profile_image", event.target.files[0]);

    const res = await fetch(
      import.meta.env.VITE_API_URL + "/user-profile/change-profile-image",
      {
        method: "POST",
        body: formData,
        headers: {
          // "Content-type": "application/json",
          // "Content-type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await res.json();
    console.log(json);

    if (res.status === 200) {
      toast.success(json.message);
      setUserCookie(JSON.stringify(json.user));
      setUser(json.user);
      reset();
    } else {
      toast.error(json.message);
    }
  };

  const handleImageUploader = () => {
    fileInputRef.current.click();
  };

  return (
    <section>
      <Container>
        <BreadCrumb
          links={[{ title: "User Profile", path: "/dashboard/user-profile" }]}
          currentPageTitle={"Change Photo"}
        />

        <div className="border p-10">
          <div className="relative inline-block">
            <img
              className="size-32 rounded-lg mb-5"
              src={
                profile_image
                  ? profile_image
                  : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              }
              alt="user phtoto"
            />
            <button
              onClick={handleImageUploader}
              className="absolute bottom-0 right-0 translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white hover:bg-blue-900 size-6 rounded-full flex justify-center items-center"
            >
              <HiCamera />
            </button>
          </div>
          <form
            // onSubmit={handleSubmit(handleUpdateImage)}
            className="flex gap-5 items-end"
          >
            <div className="">
              <input
                // {...register("profile_image", {
                //   required: true,
                // })}
                onChange={handleUpdateImage}
                ref={fileInputRef}
                className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="profile_image"
                type="file"
              />

              {errors.profile_image?.type === "required" && (
                <p className="text-red-500 text-sm m-1">
                  Product name is required
                </p>
              )}
            </div>

            {/* <button
              type="submit"
              className="inline-flex gap-3  items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
            >
              <HiLockOpen />
              Update
            </button> */}
          </form>
        </div>
      </Container>
    </section>
  );
};

export default UserProfileChangeImage;
