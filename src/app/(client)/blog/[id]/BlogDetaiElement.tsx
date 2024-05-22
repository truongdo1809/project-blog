import Link from "next/link";
import React, { useCallback } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import DetailElement from "./NewPosts";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "~/app/services_api/services";

const BlogDetaiElement = () => {
  const _fetchCategory = useCallback(async () => {
    return await fetchCategories();
  }, []);
  const { isError, data, error } = useQuery({
    queryKey: ["categoryss"],
    queryFn: _fetchCategory,
  });

  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <div className=" p-[10px] max-w-[342px] hidden lg:block">
      <div className="  mb-5">
        <span className="text-xl  font-medium text-[#222] pb-2 mb-5 border-b-2 border-[var(--primary-color)] w-full block">
          Company
        </span>
        <span className="mb-[15px] text-[15px] text-[#666666] block">
          From breathtaking landscapes to the smallest creatures, we celebrate
          the diversity and magnificence of our planet. Through our carefully
          curated content, we aim to educate.
        </span>
      </div>
      <div>
        <span className="text-xl  font-medium text-[#222] pb-2 mb-5 border-b-2 border-[var(--primary-color)] w-full block">
          Features
        </span>
        <div className=" mb-5">
          <div className=" flex  pb-[15px] w-full border-b items-center">
            <span className=" text-[var(--primary-color)]">
              <MdKeyboardDoubleArrowRight />
            </span>
            <span className=" hover:text-[var(--primary-color)] text-sm pl-2">
              Interactive Maps
            </span>
          </div>
          <div className=" flex  pb-[15px] w-full border-b items-center">
            <span className=" text-[var(--primary-color)]">
              <MdKeyboardDoubleArrowRight />
            </span>
            <span className=" hover:text-[var(--primary-color)] text-sm pl-2">
              Nature Photography
            </span>
          </div>
          <div className=" flex  pb-[15px] w-full border-b items-center">
            <span className=" text-[var(--primary-color)]">
              <MdKeyboardDoubleArrowRight />
            </span>
            <span className=" hover:text-[var(--primary-color)] text-sm pl-2">
              Educational Articles
            </span>
          </div>
          <div className=" flex  pb-[15px] w-full border-b items-center">
            <span className=" text-[var(--primary-color)]">
              <MdKeyboardDoubleArrowRight />
            </span>
            <span className=" hover:text-[var(--primary-color)] text-sm pl-2">
              Seasonal Guides
            </span>
          </div>
          <div className=" flex  pb-[15px] w-full border-b items-center">
            <span className=" text-[var(--primary-color)]">
              <MdKeyboardDoubleArrowRight />
            </span>
            <span className=" hover:text-[var(--primary-color)] text-sm pl-2">
              Nature Events Calendar
            </span>
          </div>
          <div className=" flex  pb-[15px] w-full border-b items-center">
            <span className=" text-[var(--primary-color)]">
              <MdKeyboardDoubleArrowRight />
            </span>
            <span className=" hover:text-[var(--primary-color)] text-sm pl-2">
              Travel Itineraries
            </span>
          </div>
        </div>
        <DetailElement />
        <div>
          <span className="text-xl  font-medium text-[#222] pb-2 mb-5 border-b-2 border-[var(--primary-color)] w-full block ">
            Category
          </span>

          <div className=" text-xs flex flex-wrap gap-4 text-[#666] items-center">
            {data &&
              data.map((category: any) => (
                <Link href={`/blog-list?category=${category.id}`} key={category.id}>
                  <span className=" px-[10px] py-[5px] border rounded-md hover:text-[var(--primary-color)] hover:border-[var(--primary-color)]  ">
                    {category.name}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetaiElement;
