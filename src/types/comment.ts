export interface IComment {
  comments_id: number;
  comments_createdAt: string;
  comments_updatedAt: string | null;
  comments_deletedAt: string | null;
  comments_content: string;
  comments_likeCount: number;
  comments_shareCount: number;
  comments_replyCount: number;
  comments_dislikeCount: number;
  comments_createdDate: string;
  comments_imgUrl: string | null;
  comments_blogPostId: number;
  comments_userId: number;
  comments_parentComment: number | null;
  user_id: number;
  user_username: string;
  user_imgUrl: string | null;
  comments: IComment[];
}
export interface ICommentRequest {
  id?: number;
  parent_id?: number;
  content: string;
  blogId: number;
}
export interface DeleteCommentRequest {
  commentId: string;
  blogId: number;
}

export interface Comments {
  content: string;
  replyComment: string;
}
