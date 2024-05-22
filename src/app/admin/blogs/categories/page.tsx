"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Breadcrumb from "~/components/admin-components/Breadcrumb";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { formatDate } from "~/utils/commonUtils";
import { useSelector } from "react-redux";
import authSlice from "~/app/lib/features/authSlice";
import {
  Form,
  Input,
  Modal,
  Space,
  Table,
  TableColumnsType,
  notification,
} from "antd";

import { title } from "process";

import FormItem from "antd/es/form/FormItem";
import CustomButton from "~/components/common/button/CustomBtn";
import ActionButton from "~/components/common/button/ActionBtn";
import {
  AddCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "~/app/services_api/services";
import { toast } from "react-toastify";

// interface Form {
//   name: string;
// }
interface Category {
  id: number;
  name: string;
  createdDate: string;
}
const CategoriesManager = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [idCategory, setIdCategory] = useState<any>();
  const { user } = useSelector(authSlice.selectSlice);
  const [isDeleteModal, setisDeleteModal] = useState(false);
  const accessToken = user?.user.accessToken;
  const [inputValue, setInputValue] = useState("");
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const handleUpdateCategory = (categoryName: string, id: number) => {
    setIdCategory(id);
    setIsUpdate(true);
  };
  const [form] = Form.useForm();

  const { refetch, isLoading, isError, error, data } = useQuery({
    queryKey: ["categoryKey"],
    queryFn: async () => fetchCategories(),
  });
  const refreshData = () => {
    refetch();
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  const dataTable = data.map((item: any) => ({
    key: item.id,
    id: item.id,
    name: item.name,
    createdDate: formatDate(item.createdAt),
  }));
  const handleSubmitForm = async () => {
    try {
      if (isUpdate) {
        await updateCategory(idCategory, inputValue);
        notification.success({
          message: "success",
          description: "thanh cong",
        });
        refreshData();
        setIsUpdate(false);
      } else {
        await AddCategory(inputValue);
        notification.success({
          message: "success",
          description: "thanh cong",
        });
        refreshData();
      }
    } catch (error) {
      notification.error({
        message: `Error${isUpdate ? " update category" : " add category"} `,
        description: `${error}`,
      });

      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    setIdCategory(id);
    await deleteCategory(idCategory);
    notification.success({
      message: "success",
      description: "delete thanh cong",
    });
    refreshData();
  };
  const handleIconDeleteClick = (id: number) => {
    setIdCategory(id);
    console.log(idCategory);
    setisDeleteModal(true);
  };
  const columns: TableColumnsType<Category> = [
    {
      title: "Category name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: " Create at",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: " Action",
      render: (_, record: any) => (
        <div className="flex items-center ">
          <ActionButton
            type="edit"
            onClick={() => {
              handleUpdateCategory(record.name, record.id),
                setInputValue(record.name),
                setIsOpenModalAdd(true);
            }}
            className="mr-1"
          />
          <ActionButton
            type="delete"
            onClick={() => {
              handleIconDeleteClick(record.id);
            }}
          />
        </div>
      ),
    },
  ];
  function handelClickBtnAdd(): void {
    setIsOpenModalAdd(true);
  }
  const handOK = () => {
    form.resetFields();
    setIsOpenModalAdd(false);
    setIsUpdate(false);
    handleSubmitForm();
    setInputValue("");
  };
  const handelCancel = () => {
    setIsOpenModalAdd(false), setIsUpdate(false), form.resetFields();
    setInputValue("");
  };
  return (
    <div className="p-4 md:p-6 2xl:p-10">
      <Modal
        title="Delete category"
        open={isDeleteModal}
        onCancel={() => setisDeleteModal(false)}
        onOk={() => {
          handleDelete(idCategory), setisDeleteModal(false);
        }}
      >
        <p>Are you sure.</p>
      </Modal>
      <Modal
        open={isOpenModalAdd}
        onCancel={handelCancel}
        onOk={handOK}
        title={isUpdate ? "Update category" : "Add category"}
      >
        <Form form={form}>
          <FormItem
          // name="name"
          // label="Category name"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input the title of collection!",
          //   },
          // ]}
          >
            <Input
              name="name"
              placeholder="insert category name"
              value={inputValue}
              onChange={(e: any) => setInputValue(e.target.value)}
            ></Input>
          </FormItem>
        </Form>
      </Modal>
      <Breadcrumb pageName="Edit Category" />
      <CustomButton
        type="add"
        content="New category"
        onClick={handelClickBtnAdd}
      ></CustomButton>

      <div className="col-span-5 xl:col-span-2 mt-3">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:bg-boxdark h-full">
          <div className="border-b border-stroke px-7 py-4 flex items-end justify-between">
            <h3 className="text-xl font-medium dark:text-white">
              All category
            </h3>
          </div>
          <Table
            columns={columns}
            dataSource={dataTable}
            pagination={false}
          ></Table>
        </div>
      </div>
    </div>
  );
};
export default CategoriesManager;
