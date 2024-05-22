"use client";
import { Cog6ToothIcon } from "@heroicons/react/16/solid";
import {
  EllipsisHorizontalCircleIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Popover } from "antd";
import Image from "next/image";
import { useState } from "react";
import { FaCommentDots, FaEye, FaLayerGroup } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import { Post } from "~/types/post";
import { formatDate } from "~/utils/commonUtils";

interface TableTwoProps {
  totalColSpans: number;
  title: string;
  columnTitles: {
    postName?: string;
    category?: string;
    views?: string;
    comments?: string;
    share?: string;
    actions?: string;
  };
  postData: Post[];
}

const titleActions = (
  <div className="flex items-center justify-center pt-3">
    <p
      className="border border-stroke px-2.5 py-1.5 bg-primary text-white rounded-md mr-2 opacity-90 hover:opacity-100"
      title="View full blog"
    >
      <EyeIcon className="w-5 h-5" />
    </p>
    <p
      className="border border-stroke px-2.5 py-1.5 bg-secondary text-white rounded-md mr-2 opacity-90 hover:opacity-100"
      title="Edit blog"
    >
      <PencilSquareIcon className="w-5 h-5 pl-0.5" />
    </p>
    <p
      className="border border-stroke px-2.5 py-1.5 bg-meta-1 text-white rounded-md opacity-90 hover:opacity-100"
      title="Delete blog"
    >
      <TrashIcon className="w-5 h-5" />
    </p>
  </div>
);

const TableTwo: React.FC<TableTwoProps> = ({
  totalColSpans,
  title,
  columnTitles,
  postData,
}) => {
  const [actionsPopupOpen, setActionsPopupOpen] = useState<{
    [key: number]: boolean;
  }>({});

  const hideActionsPopup = (key: number) => {
    setActionsPopupOpen((prevState) => ({
      ...prevState,
      [key]: false,
    }));
  };

  const handleOpenChange = (newOpen: boolean, key: number) => {
    setActionsPopupOpen((prevState) => ({
      ...prevState,
      [key]: newOpen,
    }));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white min-w-230">
      <div className="overflow-x-scroll">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold">{title}</h4>
      </div>

      <div
        className="grid border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
        style={{
          gridTemplateColumns: `repeat(${totalColSpans}, minmax(0, 1fr))`,
        }}
      >
        {columnTitles.postName && (
          <div className="col-span-3 flex items-center">
            <p className="font-medium">{columnTitles.postName}</p>
          </div>
        )}
        {columnTitles.category && (
          <div className="col-span-2 flex items-center justify-center">
            <p className="font-medium hidden sm:block">
              {columnTitles.category}
            </p>
            <FaLayerGroup className="w-5 h-5 sm:hidden" />
          </div>
        )}
        {columnTitles.views && (
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium hidden sm:block">{columnTitles.views}</p>
            <FaEye className="w-5 h-5 sm:hidden" />
          </div>
        )}
        {columnTitles.comments && (
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium hidden sm:block">
              {columnTitles.comments}
            </p>
            <FaCommentDots className="w-5 h-5 sm:hidden" />
          </div>
        )}
        {columnTitles.share && (
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium hidden sm:block">{columnTitles.share}</p>
            <FaShareFromSquare className="w-5 h-5 sm:hidden" />
          </div>
        )}
        {columnTitles.actions && (
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium hidden sm:block">
              {columnTitles.actions}
            </p>
            <Cog6ToothIcon className="w-5 h-5 sm:hidden" />
          </div>
        )}
      </div>

      {postData.map((post, key) => (
        <div
          className="grid border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
          style={{
            gridTemplateColumns: `repeat(${totalColSpans}, minmax(0, 1fr))`,
          }}
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 hidden sm:block rounded-md">
                <Image src={post.imgUrl} width={60} height={50} alt="Post" />
              </div>
              <div className="text-sm text-black dark:text-white">
                <p>{post.name}</p>
                <p className="text-zinc-500">
                  {/* Created: {formatDate(post.created)} */}
                </p>
              </div>
            </div>
          </div>
          {columnTitles.category && (
            <div className="col-span-2 items-center justify-center flex">
              <p className="text-sm text-black dark:text-white">
                {/* {post.category} */}
              </p>
            </div>
          )}
          {columnTitles.views && (
            <div className="col-span-1 flex items-center justify-center">
              {/* <p className="text-sm text-black dark:text-white">{post.views}</p> */}
            </div>
          )}
          {columnTitles.comments && (
            <div className="col-span-1 flex items-center justify-center">
              <p className="text-sm text-black dark:text-white">
                {/* {post.comment} */}
              </p>
            </div>
          )}
          {columnTitles.share && (
            <div className="col-span-1 flex items-center justify-center">
              <p className="text-sm">{post.share}</p>
            </div>
          )}
          {columnTitles.actions && (
            <div className="col-span-1 flex items-center justify-center">
              <div className="actions-popover xl:hidden">
                <Popover
                  content={
                    <a onClick={() => hideActionsPopup(key)}>
                      <XCircleIcon className="w-4 h-5 opacity-80 absolute top-1 right-1" />
                    </a>
                  }
                  title={titleActions}
                  trigger="click"
                  open={actionsPopupOpen[key]}
                  onOpenChange={(newOpen: boolean) =>
                    handleOpenChange(newOpen, key)
                  }
                >
                  <EllipsisHorizontalCircleIcon className="w-5 h-5" />
                </Popover>
              </div>
              <div className="hidden xl:flex items-center justify-center">
                <p
                  className="border border-stroke px-2.5 py-1.5 bg-primary text-white rounded-md mr-2 opacity-90 hover:opacity-100"
                  title="View full blog"
                >
                  <EyeIcon className="w-5 h-5" />
                </p>
                <p
                  className="border border-stroke px-2.5 py-1.5 bg-secondary text-white rounded-md mr-2 opacity-90 hover:opacity-100"
                  title="Edit blog"
                >
                  <PencilSquareIcon className="w-5 h-5 pl-0.5" />
                </p>
                <p
                  className="border border-stroke px-2.5 py-1.5 bg-meta-1 text-white rounded-md opacity-90 hover:opacity-100"
                  title="Delete blog"
                >
                  <TrashIcon className="w-5 h-5" />
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
      </div>
  );
};

export default TableTwo;
