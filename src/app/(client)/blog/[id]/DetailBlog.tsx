import React, { useEffect, useState } from "react";
import { fetchPostById } from "~/app/services_api/services";
import Image from "next/image";
import { Skeleton } from "antd";

const DetailBlog = ({ params }: { params: { id: string } }) => {
  const BlogId = params.id;
  const [postsData, setPostsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const _fetchPost = async () => {
    const res = await fetchPostById(BlogId);
    setIsLoading(true);
    if (res) {
      setPostsData(res);

      setIsLoading(false);
    }
  };
  useEffect(() => {
    _fetchPost();
  }, [BlogId]);
  if (isLoading) {
    return (
      <div className="max-w-[1000px] mx-auto">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} active />
        ))}
      </div>
    );
  }
  return (
    <div className="p-[10px]">
      <div className="mb-5">
        <Image
          width={778}
          height={518}
          src={(postsData && postsData.imgUrl) || "/pic-1.jpg"}
          alt=""
        />
      </div>
      <div className="p-[10px]">
        <div className="mb-5">
          <span className="mb-[15px] text-[25px] font-bold block">
            {postsData && postsData.title}
          </span>
        </div>
      </div>
      <div className="p-[10px]">
        <div className="mb-5">
          <span
            className="mb-[15px] text-[15px] text-[#666666] block"
            dangerouslySetInnerHTML={{ __html: postsData && postsData.content }} // Assuming content is HTML
          ></span>
        </div>
      </div>
    </div>
  );
};

export default DetailBlog;
