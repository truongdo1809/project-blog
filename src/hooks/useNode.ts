import { useState } from "react";

interface CommentItem {
  id: number;
  name: string;
  items?: CommentItem[];
}

interface TreeNode {
  id: number;
  name: string;
  items: TreeNode[];
}

// Hàm chuyển đổi từ CommentItem sang TreeNode
const convertCommentToTreeNode = (comment: CommentItem): TreeNode => {
  return {
    id: comment.id,
    name: comment.name,
    items: comment.items ? comment.items.map(convertCommentToTreeNode) : [],
  };
};

const useNode = () => {
  const [tree, setTree] = useState<CommentItem | null>(null);

  const insertNode = (tree: CommentItem, commentId: number, item: string): CommentItem => {
    const insertInto = (node: CommentItem): CommentItem => {
      if (node.id === commentId) {
        const newItem: CommentItem = { id: Date.now(), name: item };
        if (!node.items) {
          node.items = [];
        }
        node.items.push(newItem);
        return { ...node };
      } else if (node.items) {
        node.items = node.items.map(insertInto);
        return { ...node };
      }
      return node;
    };

    const updatedTree = insertInto(tree);
    setTree(updatedTree);
    return updatedTree;
  };

  const editNode = (tree: CommentItem, commentId: number, value: string): CommentItem => {
    const editIn = (node: CommentItem): CommentItem => {
      if (node.id === commentId) {
        node.name = value;
        return { ...node };
      } else if (node.items) {
        node.items = node.items.map(editIn);
        return { ...node };
      }
      return node;
    };

    const updatedTree = editIn(tree);
    setTree(updatedTree);
    return updatedTree;
  };

  const deleteNode = (tree: CommentItem, id: number): CommentItem => {
    const deleteFrom = (node: CommentItem): CommentItem => {
      if (node.items) {
        node.items = node.items.filter((item) => item.id !== id);
        node.items = node.items.map(deleteFrom);
        return { ...node };
      }
      return node;
    };

    const updatedTree = deleteFrom(tree);
    setTree(updatedTree);
    return updatedTree;
  };

  return { insertNode, editNode, deleteNode, convertCommentToTreeNode };
};

export default useNode;
