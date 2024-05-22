"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import Banner from "~/components/client-components/Banner";
import { useSearchParams } from "next/navigation";
import { fetchBlogPosts } from "../../services_api/services";
interface CategoryItem {
  id: string;
  name: string;
}
const Blog = () => {
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataBlog, setDataBlog] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const categorys = searchParams.get("category");
  const [isLoadingBlog, setIsLoadingBlog] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blog", currentPage, categorys],
    queryFn: () => fetchBlogPosts(currentPage, categorys),
  });
  useEffect(() => {
    if (data && data.length > 0) {
      setDataBlog(data);
    }
  }, [data]);

  // Lọc các danh mục duy nhất từ mảng data
  const uniqueCategory: CategoryItem[] = [];
  const categoryTracker: Record<string, boolean> = {};

  if (data && data.length > 0) {
    data.forEach((item: { category: CategoryItem }) => {
      const { id, name } = item.category;
      if (!categoryTracker[id]) {
        categoryTracker[id] = true;
        uniqueCategory.push({ id, name });
      }
    });
  }
  // phân trang blog

  const loadMoreData = async () => {
    setIsLoadingBlog(true);
    const newData = await fetchBlogPosts(currentPage + 1, categorys);
    setDataBlog((currentData) => [...currentData, ...newData]);
    setCurrentPage((currentPage) => currentPage + 1);
    setIsLoadingBlog(false);
  };
  const onScroll = useCallback(async () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !isLoading
    ) {
      await loadMoreData();
    }
  }, [isLoading, currentPage]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);
  // const handleLoadMore = () => {
  //   setCurrentPage((prevPage) => prevPage + 1);
  // };

  if (isLoading) {
    return (
      <div className="max-w-[1000px] mx-auto">
        <Skeleton active /> <Skeleton active /> <Skeleton active />
        <Skeleton active /> <Skeleton active /> <Skeleton active />
        <Skeleton active />
      </div>
    );
  }
  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }

  const filteredData =
    (data && data.length > 0 && filter === "All") || !filter
      ? data && data
      : data && data?.filter((post: any) => post.category.name === filter);
  const title =
    data && data.length > 0 && filteredData.map((post: any) => post.title);
  const markup = { __html: `${title}` };
  return (
    <div className="">
      <div>
        <Banner content="Blog" />
      </div>
      <div className="mt-[100px] mb-[30px] block">
        <div className="mb-6 ">
          <ul className="text-sm text-[#7A7A7A] flex items-center justify-center">
            <li
              className={`cursor-pointer py-1 px-4 mx-1 hover:bg-[var(--primary-color)] hover:text-white rounded ${
                filter === "All" && "bg-[var(--primary-color)] text-white"
              }`}
              onClick={() => setFilter("All")}
            >
              All
            </li>
            {data &&
              uniqueCategory.map((item: any) => (
                <li
                  key={item.id}
                  className={` cursor-pointer py-1 px-4 mx-1 hover:bg-[var(--primary-color)] hover:text-white rounded ${
                    filter === item.name &&
                    "bg-[var(--primary-color)] text-white"
                  }`}
                  onClick={() => setFilter(item.name)}
                >
                  {item.name}
                </li>
              ))}
          </ul>
        </div>
        <div className=" max-w-[1140px] mx-auto   xl:px-[50px] px-[10px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6  ">
          {data &&
            filteredData.map((blog: any) => (
              <div key={blog.id} className="w-full  mt-5 md:mt-0">
                <Link href={`/blog/${blog.id}`}>
                  <div>
                    <Image
                      width={353}
                      height={300}
                      src={ blog.imgUrl || "/pic-1.jpg"}
                      alt=""
                      className="rounded-xl w-full h-[250px]"
                    />
                  </div>
                </Link>
                <div className="pt-[10px]">
                  <Link href={`/blog/${blog.id}`}>
                    <h1 className="text-[21px] font-semibold pb-[10px]">
                      {blog.title}
                    </h1>
                  </Link>

                  <span
                    className="text-sm h-[75px] leading-6 line-clamp-3 overflow-hidden "
                    dangerouslySetInnerHTML={markup}
                  ></span>
                  <Link href={`/blog/${blog.id}`}>
                    <p className="text-[13px] text-[var(--primary-color)]">
                      Read More
                    </p>
                  </Link>
                </div>
              </div>
            ))}
        </div>
        <div className="text-center pt-[30px]">
          {!isLoadingBlog && <p>Loading more blog...</p>}
        </div>
      </div>

      {/* <div className="flex justify-center mb-8 ">
        <button
          onClick={handleLoadMore}
          className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg hover:bg-[var(--secondary-color)]"
        >
          Load More
        </button>
      </div> */}
    </div>
  );
};

export default Blog;
