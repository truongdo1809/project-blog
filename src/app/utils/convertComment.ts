import { IComment } from "~/types/comment";

export  function convertFlatToTree(flatComments: IComment[]): IComment[] {
    const commentMap: { [id: number]: IComment } = {};
    const rootComments: IComment[] = [];
  
    // Tạo một bản đồ để lưu trữ comment theo id
    flatComments.forEach(comment => {
      comment.comments = [];
      commentMap[comment.comments_id] = comment;
    });

    // Xây dựng cây comment
    flatComments.forEach(comment => {
      if (comment.comments_parentComment !== null) {
        const parentComment = commentMap[comment.comments_parentComment];
        if (parentComment) {
          parentComment.comments.push(comment);
        } else {
          // Trường hợp không tìm thấy comment cha, coi comment hiện tại là comment gốc
          rootComments.push(comment);
        }
      } else {
        // Nếu comment không có parentComment, coi là comment gốc
        rootComments.push(comment);
      }
    });
  
    return rootComments;
  }
  