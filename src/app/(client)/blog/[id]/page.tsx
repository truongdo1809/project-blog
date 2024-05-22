"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSocketService from "~/hooks/useSocketService";
import BlogDetaiElement from "./BlogDetaiElement";
import CommentComponent from "./Comments";
import { createComment } from "~/app/services_api/comment.service";
import { Comments } from "~/types/comment";

import DetailBlog from "./DetailBlog";
import { convertFlatToTree } from "~/app/utils/convertComment";

const BlogDetail = ({ params }: { params: { id: string } }) => {
  const [postsData, setPostsData] = useState<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Comments>();
  const BlogId = params.id;
  const { emit, on } = useSocketService(process.env.NEXT_PUBLIC_API_URL || "");

  useEffect(() => {
    on("actionComment", (data) => {
      console.log("âfasfasfs", data);
      setPostsData(data.data);
    });
  }, []);
  const handleCreateComment = async (data: Comments) => {
    const req = {
      content: data.content,
      blogId: Number(BlogId),
    };
    const res = await createComment(req);
    if (res.success === true) {
      emit("comment:action", req);
      reset();
    }
  };
  return (
    <div className=" flex justify-center  mb-[100px] ">
      <div className=" max-w-[798px]">
        <DetailBlog params={params} />
        {/* Comment section */}
        <div className=" text-center mt-2  mb-[18px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[17px] font-bold text-gray-900 dark:text-white">
              Discussion (20)
            </h2>
          </div>
          <form className="mb-6" onSubmit={handleSubmit(handleCreateComment)}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows={6}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                {...register("content", {
                  required: "Coment is required",
                  maxLength: {
                    value: 250,
                    message: "You can only enter a maximum of 250 characters",
                  },
                })}
              ></textarea>
            </div>
            {errors.content && (
              <span className=" text-red">{errors.content.message}</span>
            )}
            <div className="flex">
              <button
                type="submit"
                className="bg-primary inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Post comment
              </button>
            </div>
          </form>
        </div>

        <div>
          {postsData &&
            convertFlatToTree(postsData.comments).map((comment: any) => (
              <CommentComponent
                key={comment.comments_id}
                comment={comment}
                BlogId={BlogId}
              />
            ))}
        </div>
      </div>
      <BlogDetaiElement />
    </div>
  );
};

export default BlogDetail;
