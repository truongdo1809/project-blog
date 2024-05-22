import { current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { privateRequest, publicRequest } from "~/app/lib/createInstance";
// call lấy tất cả blog và lọc theo category và phân trang
export async function fetchBlogPosts(
  currentPage: number,
  categorys?: string | null
) {
  try {
    const response = await publicRequest("post", `/posts/get-posts`, {
      pageSize: currentPage * 6,
      categoryId: [categorys],
    });

    return response.data;
  } catch (error) {
    toast.error("fetchBlog failed try again");
    throw new Error((error as Error).message);
  }
} // call api lấy category
export async function fetchCategories() {
  try {
    const response = await publicRequest("get", "/category");
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
// Lấy bài blog theo pageNumber và pageSize
export async function fetchPostsByPageAndPageSize(
  pageNumber: number,
  pageSize: number
) {
  try {
    const response = await publicRequest("post", "/posts/get-posts", {
      pageNumber,
      pageSize,
    });
    return response;
  } catch (error) {
    console.error("Error fetching new page data:", error);
    return null;
  }
}

// call lấy tất cả blogs
export async function fetchBlogPosts2(isAll: boolean) {
  try {
    const response = await publicRequest("post", `/posts/get-posts`, { isAll });
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

// call api Blog theo id
export async function fetchPostById(id: string) {
  try {
    const response = await publicRequest("get", `/posts/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching post");
    throw new Error((error as Error).message);
  }
}

export async function handleDeleteComment(
  commentId: number,
  setCommentSocket: React.Dispatch<React.SetStateAction<any[]>>
) {
  try {
    const isConfirmed = await new Promise((resolve) => {
      const userConfirmation = window.confirm(
        "Are you sure you want to delete this comment"
      );
      resolve(userConfirmation);
    });
    if (isConfirmed) {
      await privateRequest("delete", `/comment/delete/${commentId}`);
      toast.success("Comment deleted successfully");
      setCommentSocket((prevComments) =>
        prevComments.filter((comments) => comments.id !== commentId)
      );
    }
  } catch (error: any) {
    toast.error(error.respone.data.message);
    console.log(error);
  }
}

// get all user

export async function getAllUser(
  isAll: boolean,
  currentPage: number,
  username?: string,
  email?: string
) {
  const requestData = {
    pageSize: currentPage * 10,
    email,
    username,
    isAll,
  };

  try {
    const response = await privateRequest(
      "post",
      "/user/get-users",
      requestData
    );
    return response.data.users;
  } catch (error) {
    toast.error("Error getting try again");
    throw new Error((error as Error).message);
  }
}
//  get user theo id
export async function getUserId(userId: number) {
  try {
    const response = await privateRequest("get", `/user/${userId}`);
    return response.data.data;
  } catch (error) {
    toast.error("Error getting try again");

    throw new Error((error as Error).message);
  }
}

// delete user
export async function DeleteUser(
  userId: number,
  setDataUser: React.Dispatch<React.SetStateAction<any[]>>
) {
  try {
    const isConfirmed = await new Promise((resolve) => {
      const userConfirmation = confirm(
        "Are you sure you want to delete this user?"
      );
      resolve(userConfirmation);
    });

    if (isConfirmed) {
      await privateRequest("delete", `/user/${userId}`);
      toast.success("Delete user is successfully");
      setDataUser((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
    }
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}
// GetAll Comment

export async function GetAllComment(
  isAll: boolean,
  content?: string,
  username?: string
) {
  try {
    const respone = await privateRequest("post", "/comment", {
      isAll,
      content,
      username,
    });
    console.log(respone.data.commentDatas);
    return respone.data.commentDatas;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllUserComment(isAll: boolean) {
  const requestData = {
    isAll,
  };

  try {
    const response = await privateRequest(
      "post",
      "/user/get-users",
      requestData
    );
    return response.data.users;
  } catch (error) {
    toast.error("Error getting try again");
  }
}

// add category
export async function AddCategory(name: string) {
  const requestData = {
    name,
  };

  try {
    const response = await privateRequest(
      "post",
      "category/create",
      requestData
    );
    return response;
  } catch (error) {
    toast.error("Error getting try again");
    throw new Error((error as Error).message);
  }
}

// update category

export async function updateCategory(id: number, name: string) {
  const requestData = {
    name,
  };

  try {
    const response = await privateRequest(
      "patch",
      `category/update/${id}`,
      requestData
    );
    return response;
  } catch (error) {
    toast.error("Error getting try again");
    throw new Error((error as Error).message);
  }
}
// delete category
export async function deleteCategory(id: number) {
  try {
    const respone = await privateRequest("delete", `category/delete/${id}`);
    return respone;
  } catch (error) {
    toast.error("Error getting try again");
  }
}

// get all folders
export async function getAllFolder(isAll: boolean) {
  try {
    const response = await privateRequest("post", "/file/folder/get-folders", {
      isAll: isAll,
    });
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}
// create folder
export async function createFolder(name: string) {
  try {
    const respone = await privateRequest("post", "/file/folder", {
      name: name,
    });
    return respone;
  } catch (error: any) {
    toast.error(
      error.response.data.message || " create folder failed try again"
    );
  }
}

// delete folder
export async function deleteFolders(
  setDataFolder: React.Dispatch<React.SetStateAction<any[]>>,
  folderId?: string
) {
  try {
    const isConfirmed = await new Promise((resolve) => {
      const userConfirmation = confirm(
        "Are you sure you want to delete this folder?"
      );
      resolve(userConfirmation);
    });
    if (isConfirmed) {
      const response = await privateRequest("delete", `/file/folder/delete`, {
        id: [folderId],
      });
       toast.success("Folders deleted successfully");
      // const respon = await getAllFolder(true);
      // setDataFolder(respon);
      setDataFolder((prevFolder) =>
        prevFolder.filter((folder) => folder.id !== folderId)
      );
     
      return response;
    }
  } catch (error: any) {
    toast.error(error.response.message || "delete failed try  again");
  }
}
// update folder

export async function updateFolder(id: string, name: string) {
  try {
    const response = await privateRequest("patch", `/file/folder/${id}`, {
      name: name,
    });
    toast.success("Folders updated successfully");
    return response;
  } catch (error: any) {
    toast.error(
      error.response.data.message || "update folder failed try again"
    );
  }
}
// create folder con
export async function createFolderChild(id: string, name: string) {
  try {
    const response = await privateRequest("post", `/file/folder?parent=${id}`, {
      name: name,
    });
    toast.success("create folder  successfully");
    return response;
  } catch (error: any) {
    toast.error(
      error.response.data.message || " create folder failed try again"
    );
  }
}

// seacrh file by file name
export async function getDataSearchFile(filename?: string | undefined) {
  try {
    const response = await privateRequest("post", "/file/get-files", {
      filename: filename,
    });
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message || "search file failed try again");
  }
}
//get file by folderId
export async function getFileByFolderId(
  currentPage?: number | undefined,
  folderId?: string | undefined,
  filename?: string | undefined
) {
  try {
    const response = await privateRequest("post", "/file/get-files", {
      pageSize: currentPage! * 20,
      folderId: folderId,
      filename: filename,
    });
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}
// create file
export async function createFile(fileList: any, folderId: string) {
  const formData = new FormData();
  formData.append("file", fileList);
  formData.append("folderId", folderId);
  try {
    const respone = await privateRequest("post", "/file/upload", formData);
    return respone;
  } catch (error: any) {
    toast.error(error.response.data.message || "create file failed try again");
  }
}

//update file
export async function updateFile(id: string, name: string) {
  try {
    const response = await privateRequest("patch", `/file/update/${id}`, {
      filename: name,
    });

    toast.success("File updated successfully");
    return response;
  } catch (error: any) {
    toast.error(error.response.data.message || "update file failed try again");
  }
}

// delete file
export async function deleteFile(
  setDataFile: React.Dispatch<React.SetStateAction<any[]>>,
  fileId: string
) {
  try {
    const isConfirmed = await new Promise((resolve) => {
      const userConfirmation = confirm(
        "Are you sure you want to delete this file?"
      );
      resolve(userConfirmation);
    });
    if (isConfirmed) {
      const response = await privateRequest("delete", `/file/delete`, {
        id: [fileId],
      });

      setDataFile((prevFile) => prevFile.filter((file) => file.id !== fileId));
      toast.success("File deleted successfully");
      return response;
    }
  } catch (error: any) {
    toast.error(error.response.data.message || "delete failed try  again");
  }
}
