"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { fetchBlogPosts2 } from "../../../services_api/services";
import { toast } from "react-toastify";
const NewPosts = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blog"],
    queryFn: () => fetchBlogPosts2(true),
  });
  const dataBlogs = data && data?.slice(0, 3);

  if (isLoading) {
    return (
      <div>
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </div>
    );
  }
  if (isError) {
    toast.error("fetching new blog false try again");
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <div className="mb-5">
      <span className="text-xl  font-medium text-[#222] pb-2 mb-5 border-b-2 border-[var(--primary-color)] w-full block">
        New Blog
      </span>
      {dataBlogs.map((blog: any) => (
        <div className=" flex " key={blog.id}>
          <div className=" mb-3  ">
            <Link href={`/blog/${blog.id}`}>
              <div className="h-[64px]">
                <Image
                  width={96}
                  height={64}
                  src={"/pic-1.jpg" || blog.imgUrl}
                  alt={blog.title}
                  className=" rounded-lg h-full max-w-[200px] object-cover"
                />
              </div>
            </Link>
          </div>
          <Link href={`/blog/${blog.id}`}>
            <span className=" ml-3 text-[15px] text-[#333] font-bold   block">
              {blog.title}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NewPosts;
