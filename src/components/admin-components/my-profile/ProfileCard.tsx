import Image from "next/image";
import {
  CameraIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import authSlice from "~/app/lib/features/authSlice";
import { privateRequest } from "~/app/lib/createInstance";

const ProfileCard = () => {
  const { user } = useSelector(authSlice.selectSlice);
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await privateRequest("post", `/flie/upload`, formData);
      return response.data.data.filePath;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white h-full">
      <div className="px-4 py-6 text-center">
        <div className="relative z-30 mx-auto h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44">
          <div className="relative drop-shadow-2">
            <div className="h-[168px]">
              <Image
                width={184}
                height={184}
                src={user?.user.imgUrl || "/pic-1.jpg"}
                alt="Avatar"
                className=" h-full object-cover"
              />
            </div>
            <label
              htmlFor="avatar"
              className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
            >
              <CameraIcon className="w-4 h-4" />
              <input
                type="file"
                name="avatar"
                id="avatar"
                className="sr-only"
              />
            </label>
          </div>
        </div>
        <div className="mt-4 mb-5.5">
          <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
            {user?.user.username}
          </h3>
          <p className="text-[#AEB7C0]">{user?.user.roles}</p>
          <div className="mx-auto mt-4.5 grid max-w-60 grid-cols-2 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
            <div className="border-r border-stroke px-4">
              <span className="font-medium text-black dark:text-white">
                {/* {posts} */}
              </span>{" "}
              <span className="text-sm text-[#AEB7C0]">Posts</span>
            </div>
            <div className="px-4">
              <span className="font-medium text-black dark:text-white">
                {/* {followers} */}
              </span>{" "}
              <span className="text-sm text-[#AEB7C0]">Followers</span>
            </div>
          </div>
        </div>
        <div className="border-t border-stroke"></div>

        <div className="mt-5.5 dark:text-stroke flex justify-center">
          <div>
            <div className="flex items-center">
              <PhoneIcon className="w-6 h-6" />
              <p className="ml-2">
                <span>{user?.user.roles}</span>
              </p>
            </div>
            <div className="flex items-center mt-3">
              <EnvelopeIcon className="w-6 h-6" />
              <p className="ml-2">{user?.user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
