import React, { useState } from "react";
import Image from "next/image";
import { Comments, IComment } from "~/types/comment";
import { formatDate } from "~/utils/commonUtils";
import { MdOutlineBrowserUpdated } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { useSelector } from "react-redux";
import authSlice from "~/app/lib/features/authSlice";
import { useForm } from "react-hook-form";
import {
  createComment,
  deleteComment,
} from "~/app/services_api/comment.service";
import useSocketService from "~/hooks/useSocketService";
interface CommentProps {
  comment: IComment;
  BlogId: string;
}
const CommentComponent: React.FC<CommentProps> = ({ comment, BlogId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Comments>();
  const { user } = useSelector(authSlice.selectSlice);
  const [replyComment, setReplyComment] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [openIcon, setOpenIcon] = useState<{ [key: number]: boolean }>({});
  const { emit, on } = useSocketService(process.env.NEXT_PUBLIC_API_URL || "")
  const handleOpenIcon = (commentId: number) => {
    setOpenIcon((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };
  const handleReplyCommentModal = (commentId: number) => {
    setReplyComment((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };
  const handleReplyComment = async (data: Comments) => {
    const req = {
      content: data.replyComment,
      parent_id: comment.comments_id,
      blogId: Number(BlogId),
    };
    const res = await createComment(req);
    if (res.success === true) {
      emit("comment:action", req);
      reset();
    }
  };
  const handleDeleteComment = async (commentId: any) => {
    const req = {
      blogId: Number(BlogId),
    };
    const res = await deleteComment(commentId);
    if (res && res.success === true) {
      console.log("wewwr",res)
      emit("comment:action", req);
    } else {
      console.log("erros");
    }
  };

  const renderReplies = (parentComment: IComment) => {
    return (
      parentComment.comments && (
        <ul className="ml-4">
          {parentComment.comments.map((reply: IComment) => (
            <li
              key={reply.comments_id}
              className="py-2 border-l-2 border-slate-200 pl-2"
            >
              <CommentComponent comment={reply} BlogId={BlogId} />
            </li>
          ))}
        </ul>
      )
    );
  };

  return (
    <div className={` rounded-lg `}>
      <div className="flex items-start rounded-2xl p-2">
        <Image
          className="w-10 h-10 rounded-full"
          src={comment.user_imgUrl || "https://via.placeholder.com/50"}
          alt="Profile"
          width={30}
          height={30}
        />
        <div className="ml-1 w-full">
          <div className=" border border-[#E9E9E9] rounded-xl p-3">
            <div className=" flex justify-between items-center ">
              <div>
                <span className="">{comment.user_username}</span>
                <span className="text-xs text-[#5e5d5d]  pl-2 font-extralight ">
                  {formatDate(comment.comments_createdAt)}
                </span>
              </div>
              {user && user.user.id === comment.user_id && (
                <div
                  className=" cursor-pointer relative"
                  onClick={() => handleOpenIcon(comment.comments_id)}
                >
                  <PiDotsThreeOutlineLight className="text-[20px] " />
                  {openIcon[comment.comments_id] && (
                    <div className=" absolute -left-[100px] -bottom-[50px] ">
                      <div className="flex items-center bg-slate-100 hover:bg-slate-200 p-2">
                        <span className=" mr-2 text-[20px] text-[var(--primary-color)] ">
                          <MdOutlineBrowserUpdated />
                        </span>
                        <span>Update</span>
                      </div>
                      <div
                        className="flex items-center bg-slate-100  hover:bg-slate-200 p-2"
                        onClick={() => handleDeleteComment(comment.comments_id)}
                      >
                        <span className="mr-2 text-[20px] text-red">
                          <RiDeleteBin5Line />
                        </span>
                        <span>Delete</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <p className="text-sm mt-1">{comment.comments_content}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <button
              className=" text-sm text-gray-500 hover:text-[var(--primary-color)] dark:text-gray-400 font-medium"
              onClick={() => handleReplyCommentModal(comment.comments_id)}
            >
              Reply
            </button>
          </div>
          {replyComment[comment.comments_id] && (
            <form className="mt-2" onSubmit={handleSubmit(handleReplyComment)}>
              <textarea
                className="w-full border rounded-md p-2"
                placeholder="Write a reply..."
                {...register("replyComment", {
                  required: "contentReply is required",
                  maxLength: {
                    value: 250,
                    message: "replyComment must not exceed 250 characters !",
                  },
                })}
              />
              {errors.replyComment && (
                <span className="text-red">{errors.replyComment.message}</span>
              )}
              <div className="flex gap-5">
                <button
                  type="submit"
                  className="bg-primary inline-flex items-center py-1 px-4 text-[16px] font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                  <span className="mr-1">Save</span>
                </button>
                <button
                  onClick={() => handleReplyCommentModal(comment.comments_id)}
                  type="button"
                  className=" bg-green-400 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none flex items-center"
                >
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      {renderReplies(comment)}
    </div>
  );
};

export default CommentComponent;
