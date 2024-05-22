"use client";
import { useEffect, useState } from "react";
import { Table, TableColumnsType } from "antd";
import React from "react";
import { Post } from "~/types/post";
import { API_URLS, formatDate } from "~/utils/commonUtils";
import axios from "axios";
import { useSelector } from "react-redux";
import authSlice from "~/app/lib/features/authSlice";
import Image from "next/image";
import ActionButton from "~/components/common/button/ActionBtn";
import { useRouter } from "next/navigation";
import DeleteConfirmationModal from "../modal/DeleteConfirmationModal";

interface TableThreeProps {
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
  selectedColumns: string[];
  data: Post[];
  reloadData: () => void;
}

const TableThree: React.FC<TableThreeProps> = ({
  selectedRowKeys,
  setSelectedRowKeys,
  selectedColumns,
  data,
  reloadData,
}) => {
  const updatedSelectedColumns = [...selectedColumns, "Action"];
  const [dataTransformed, setDataTransformed] = useState<any>([]);
  const [deletePostId, setDeletePostId] = useState<number | string | null>(null);
  const [visibleModal, setVisibleModal] = useState(false);
  const { user } = useSelector(authSlice.selectSlice);
  const router = useRouter();
  const accessToken = user && user.user.accessToken;

  useEffect(() => {
    const transformData = () => {
      if (!data) return [];
      return data.map((post) => ({
        ...post,
        key: post.id,
        category: post.category.name,
        createdAt: formatDate(post.createdAt),
        comment: post.comments.length,
      }));
    };

    setDataTransformed(transformData());
  }, [data]);

  const handleDeletePost = (postId: string | number) => {
    setDeletePostId(postId);
    setVisibleModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletePostId) return;

    try {
      await axios.delete(`${API_URLS.DELETEPOST}${deletePostId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setDataTransformed((prevData: any) =>
        prevData.filter((post: Post) => post.id !== deletePostId)
      );
      setVisibleModal(false);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeletePostId(null);
    setVisibleModal(false);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const columns: TableColumnsType<Post> = [
    {
      title: "Id",
      width: 50,
      dataIndex: "id",
      fixed: "left",
      hidden: !selectedColumns.includes("Id"),
    },
    {
      title: "Name",
      width: 200,
      dataIndex: "title",
      fixed: "left",
      hidden: !selectedColumns.includes("Name"),
    },
    {
      title: "Thumbnail",
      width: 90,
      render: (text, record) =>
        record.imgUrl && (
          <Image
            width={1000}
            height={1000}
            alt="Post's image"
            src={
              typeof record.imgUrl === "string"
                ? record.imgUrl
                : URL.createObjectURL(record.imgUrl)
            }
            className="object-cover h-full w-full border rounded-lg border-stroke"
          />
        ),
      hidden: !selectedColumns.includes("Thumbnail"),
    },
    {
      title: "Category",
      width: 160,
      dataIndex: "category",
      hidden: !selectedColumns.includes("Category"),
    },
    {
      title: "Created",
      width: 90,
      dataIndex: "createdAt",
      hidden: !selectedColumns.includes("Created"),
    },
    {
      title: "Views",
      width: 60,
      dataIndex: "viewCount",
      hidden: !selectedColumns.includes("Views"),
    },
    {
      title: "Comments",
      width: 80,
      dataIndex: "comment",
      hidden: !selectedColumns.includes("Comment"),
    },
    {
      title: "Status",
      width: 80,
      dataIndex: "status",
      render: (text, record) => {
        let backgroundColor = "#7a7a7a";
        if (record.status === "published") {
          backgroundColor = "#52c41a";
        } else if (record.status === "pending") {
          backgroundColor = "#1677ff";
        } else if (record.status === "trash") {
          backgroundColor = "#f5222d";
        }

        return (
          <div
            className="text-white py-[1px] px-0.5 rounded-md text-center"
            style={{ backgroundColor }}
          >
            {text}
          </div>
        );
      },
      hidden: !selectedColumns.includes("Status"),
    },
    {
      title: "Action",
      width: 80,
      fixed: "right",
      render: (_, record) => {
        const postId = record.id;
        if (postId !== undefined) {
          return (
            <div className="flex items-center justify-center">
              <ActionButton type="view" title="View full post" />
              <ActionButton
                type="edit"
                title="Edit post"
                onClick={() =>
                  router.push(`/admin/blogs/blog-editor?id=${postId}`)
                }
                className="mx-1"
              />
              <ActionButton
                type="delete"
                title="Delete post"
                onClick={() => handleDeletePost(postId)}
              />
            </div>
          );
        }
        return null;
      },
      hidden: !updatedSelectedColumns.includes("Actions"),
    },
  ];

  return (
    <>
      <Table
        rowSelection={rowSelection}
        columns={columns.filter((col) => !col.hidden)}
        dataSource={dataTransformed}
        scroll={{ x: 1300 }}
        bordered
        pagination={false}
      />
      <DeleteConfirmationModal
        visible={visibleModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default TableThree;
