"use client";
import { Cog6ToothIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { Form, Modal, Pagination, Select, notification } from "antd";
import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import authSlice from "~/app/lib/features/authSlice";
import {
  fetchBlogPosts2,
  fetchPostsByPageAndPageSize,
  
} from "~/app/services_api/services";
import Breadcrumb from "~/components/admin-components/Breadcrumb";
import FilterColumns from "~/components/admin-components/blogs/FilterColumns";
import FilterSection from "~/components/admin-components/blogs/FilterSection";
import ChangeStatusConfirmationModal from "~/components/admin-components/modal/ChangeStatusConfirmationModal";
import TableThree from "~/components/admin-components/tables/TableThree";
import CustomButton from "~/components/common/button/CustomBtn";
import { API_URLS, columnTitles, StatusOptions } from "~/utils/commonUtils";

interface PaginationInfo {
  currentPage?: number;
  pageSize?: number;
  totalItems?: number;
  pages?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export default function BlogsPage() {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    Object.values(columnTitles)
  );
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [filterColumnVisible, setFilterColumnVisible] =
    useState<boolean>(false);
  const [posts, setPosts] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>();
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { user } = useSelector(authSlice.selectSlice);
  const accessToken = user && user?.user.accessToken;
  const [form] = Form.useForm();

  const _fetchAllPost = useCallback(async () => {
    try {
      const response = await fetchBlogPosts2(true);
      return response;
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      throw new Error("Failed to fetch blog posts");
    }
  }, []);

  const { refetch, data } = useQuery({
    queryKey: ["postKey"],
    queryFn: _fetchAllPost,
  });

  useEffect(() => {
    if (data) {
      setPosts(data.data);
      setPaginationInfo(data.paginationInfo);
    }
  }, [data]);

  const reloadData = () => {
    refetch();
  };

  const handleFilterToggle = () => {
    setFilterVisible((prev) => !prev);
    setFilterColumnVisible(false);
  };

  const handleFilterColumnToggle = () => {
    setFilterColumnVisible((prev) => !prev);
    setFilterVisible(false);
  };

  const handleColumnSelectionChange = (selectedColumns: string[]) => {
    setSelectedColumns(selectedColumns);
  };

  const handleActionSelect = (value: string | null) => {
    if (selectedRowKeys.length === 0) {
      notification.info({
        message: "Bạn chưa chọn  bài đăng nào!",
        description: "Vui lòng chọn bài đăng để thay đổi trạng thái!",
      });
      setSelectedAction(null);
      form.resetFields();
      return;
    }

    setSelectedAction(value);
    setShowConfirmModal(selectedRowKeys.length !== 0);
  };

  const handleConfirmStatusChange = async () => {
    try {
      for (const postId of selectedRowKeys) {
        await axios.patch(
          `${API_URLS.UPDATEPOST}/${postId}`,
          {
            status: selectedAction,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }
      notification.success({
        message: "Thay đổi trạng thái thành công!",
        description: `${selectedRowKeys.length} bài đăng đã đổi thành "${selectedAction}"!`,
      });
      setSelectedRowKeys([]);
      setSelectedAction(null);
      form.resetFields();
      setShowConfirmModal(false);
      reloadData();
    } catch (error) {
      console.error("Error updating post status:", error);
      setShowConfirmModal(false);
    }
  };

  const handlePageChange = async (pageNumber: number, pageSize: number) => {
    if (!paginationInfo) return;

    try {
      const newPageData = await fetchPostsByPageAndPageSize(
        pageNumber,
        pageSize
      );
      if (newPageData) {
        setPosts(newPageData.data);
        setPaginationInfo(newPageData.paginationInfo);
      }
    } catch (error) {
      console.error("Error fetching new page data:", error);
    }
  };

  return (
    <section className=" bg-white p-4 md:p-6 2xl:p-10">
      <div className="">
        <Breadcrumb pageName="Blogs" />

        <div className="w-full overflow-hidden">
          <div>
            <div className="flex justify-between">
              <Link href="/admin/blogs/blog-editor">
                <CustomButton content="New post" type="add" />
              </Link>
              <div className="flex">
                <button
                  className={`relative flex items-center justify-center min-w-[110px] border py-1 px-3 rounded-md hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] dark:hover:text-[var(--primary-color)] mr-1 z-20 ${
                    filterVisible
                      ? "border-[var(--primary-color)] text-[var(--primary-color)] dark:text-[var(--primary-color)]"
                      : "border-stroke dark:text-stroke"
                  }`}
                  onClick={handleFilterToggle}
                >
                  <FunnelIcon className="w-5 h-5 mr-1" /> Filter
                </button>
                <button
                  className={`relative flex ml-2 items-center justify-center min-w-[110px] border py-1 px-3 rounded-md hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] dark:hover:text-[var(--primary-color)] mr-1 z-20 ${
                    filterColumnVisible
                      ? "border-[var(--primary-color)] text-[var(--primary-color)] dark:text-[var(--primary-color)]"
                      : "border-stroke dark:text-stroke"
                  }`}
                  onClick={handleFilterColumnToggle}
                >
                  <Cog6ToothIcon className="w-5 h-5 mr-1" /> Columns
                </button>
              </div>
            </div>
          </div>

          <div
            className={`duration-300 ease-linear ${
              filterColumnVisible ? "hidden" : ""
            } ${filterVisible ? "opacity-100 h-full" : "opacity-0 h-0 hidden"}`}
          >
            <FilterSection
              filterVisible={filterVisible}
              setFilterVisible={setFilterVisible}
            />
          </div>

          <div
            className={`duration-300 ease-linear ${
              filterVisible ? "hidden" : ""
            } ${
              filterColumnVisible
                ? "opacity-100 h-full"
                : "opacity-0 h-0 hidden"
            }`}
          >
            <FilterColumns
              value={selectedColumns}
              options={Object.values(columnTitles)}
              onColumnSelectionChange={handleColumnSelectionChange}
            />
          </div>

          <div className="flex justify-start flex-col xsm:flex-row items-start xsm:items-center xsm:justify-items-stretch mt-6">
            <Form form={form}>
              <Form.Item name="status" initialValue={null}>
                <Select
                  placeholder="Change posts's status"
                  style={{ width: 180, marginRight: "12px" }}
                  options={StatusOptions}
                  onChange={(value) => handleActionSelect(value)}
                />
              </Form.Item>
            </Form>
            <p className="ml-4 dark:text-meta-2 mt-4 xsm:mt-0">
              {paginationInfo && paginationInfo.totalItems} post found
            </p>
          </div>
        </div>

        <div className="my-5">
          <TableThree
            selectedColumns={selectedColumns}
            data={posts}
            reloadData={reloadData}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
          />
        </div>
        <div className="flex justify-end">
          <Pagination
            current={paginationInfo && paginationInfo.currentPage}
            pageSize={paginationInfo && paginationInfo.pageSize}
            total={paginationInfo && paginationInfo.totalItems}
            onChange={(pageNumber, pageSize) =>
              handlePageChange(pageNumber, pageSize)
            }
          />
        </div>
        <ChangeStatusConfirmationModal
          visible={showConfirmModal}
          onConfirm={handleConfirmStatusChange}
          onCancel={() => setShowConfirmModal(false)}
          selectedRowKeys={selectedRowKeys}
          selectedAction={selectedAction}
        />
      </div>
    </section>
  );
}
