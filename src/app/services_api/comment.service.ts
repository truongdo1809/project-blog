import { DeleteCommentRequest, ICommentRequest } from "~/types/comment";
import { privateRequest } from "../lib/createInstance";
import { toast } from "react-toastify";

export const createComment = async (req: ICommentRequest) => {
  try {
    if (req?.parent_id) {
      const response = await privateRequest(
        "post",
        `/comment/create?parent=${req?.parent_id}`,
        {
          content: req.content,
          blogPostId: req.blogId,
        }
      );
      toast.success("Create comment successfully");
      return response;
    } else {
      const response = await privateRequest("post", `/comment/create`, {
        content: req.content,
        blogPostId: req.blogId,
      });
      toast.success("Create comment successfully");
      return response;
    }
  } catch (error) {
    toast.error("Create comment failed try again");
    throw error;
  }
};
export const deleteComment = async (commentId: number, req?: DeleteCommentRequest) => {
  try {
    const isConfirmed = await new Promise((resolve) => {
      const userConfirmation = window.confirm(
        "Are you sure you want to delete this comment"
      );
      resolve(userConfirmation);
    });
    if (isConfirmed) {
      if (commentId) { 
        const response = await privateRequest(
          "delete",
          `/comment/delete/${commentId}`, 
          { blogPostId: req?.blogId }
        );
        toast.success("Delete comment successfully");
        return response;
      }
      
    }
  } catch (error) {
    toast.error("Delete comment failed try again");
  }
};

