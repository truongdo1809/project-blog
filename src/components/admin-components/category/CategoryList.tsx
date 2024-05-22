import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import React, { useState } from "react";
interface Category {
  categoryName: string;
  createDate: string;
}
const CategoryList = ({ categoryName, createDate }: Category) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const handleUpdateCategory = () => {
    setIsUpdate(true);
  };
  return (
    <div>
      <div className="p-7">
        <div className="flex flex-col justify-between flex-1">
          <div className="text-overflow-1-lines dark:text-white text-lg">
            {categoryName}
          </div>
          <div className="flex text-sm">
            <div className="text-zinc-500">Created: {createDate}</div>
          </div>
          <div className="flex justify-end items-center">
            <div className="py-0.5 h-full">
              <div className="w-[1px] h-full bg-form-strokedark"></div>
            </div>
            <div>
              <button
                className="flex items-center text-meta-5 opacity-70 hover:opacity-100 mr-2"
                onClick={handleUpdateCategory}
              >
                <PencilSquareIcon className="w-4 h-4 mr-1" />
                <span>Edit</span>
              </button>
            </div>
            <div className="py-0.5 h-full">
              <div className="w-[1px] h-full bg-form-strokedark"></div>
            </div>
            <div>
              <button className="flex items-center text-meta-1 opacity-70 hover:opacity-100">
                <TrashIcon className="w-4 h-4 mr-1" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
