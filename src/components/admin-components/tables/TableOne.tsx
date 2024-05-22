import Image from "next/image";
import Link from "next/link";
import { FaCommentDots, FaEye } from "react-icons/fa";
import { FaLayerGroup, FaShareFromSquare } from "react-icons/fa6";
import { Post } from "~/types/post";
import { formatDate } from "~/utils/commonUtils";

interface TableOneProps {
  postData: Post[];
  title: string;
}

const postData: Post[] = [
];

const TableOne = ({ postData, title }: TableOneProps) => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white">
      <div className="flex justify-between items-end px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold">{title}</h4>
        <Link
          href="#"
          className="dark:text-white hover:text-[var(--primary-color)] dark:hover:hover:text-[var(--primary-color)]"
        >
          View more
        </Link>
      </div>

      <div className="grid border-t border-stroke px-4 py-4.5 dark:border-strokedark grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Post Name</p>
        </div>
        <div className="col-span-2 items-center justify-center flex">
          <FaLayerGroup className="w-4 h-4 sm:hidden" />
          <p className="font-medium hidden sm:block">Category</p>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <FaEye className="w-4 h-4 sm:hidden" />
          <p className="font-medium hidden sm:block">Views</p>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <FaCommentDots className="w-4 h-4 sm:hidden" />
          <p className="font-medium hidden sm:block">Comments</p>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <FaShareFromSquare className="w-4 h-4 sm:hidden" />
          <p className="font-medium hidden sm:block">Share</p>
        </div>
      </div>

      {postData.map((post, key) => (
        <div
          className="grid border-t border-stroke px-4 py-4.5 dark:border-strokedark grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md hidden sm:block">
                <Image src={post.imgUrl} width={60} height={50} alt="Post" />
              </div>
              <div className="text-sm text-black dark:text-white">
                <p>{post.name}</p>
                {/* <p className="text-zinc-500">Created: {post.created}</p> */}
              </div>
            </div>
          </div>
          <div className="col-span-2 items-center justify-center flex">
            <p className="text-sm text-black dark:text-white">
              {/* {post.category} */}
            </p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            {/* <p className="text-sm text-black dark:text-white">{post.views}</p> */}
          </div>
          <div className="col-span-1 flex items-center justify-center">
            {/* <p className="text-sm text-black dark:text-white">{post.comment}</p> */}
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="text-sm text-meta-3">{post.share}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableOne;
