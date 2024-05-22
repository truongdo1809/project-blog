"use client";
import { useQuery } from "@tanstack/react-query";
import {
  Form,
  Input,
  Select,
  Table,
  TableColumnType,
  TableColumnsType,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useEffect } from "react";
import { useCallback, useState } from "react";
import {
  GetAllComment,
  getAllUser,
  getAllUserComment,
} from "~/app/services_api/services";
import ApplyBtn from "~/components/common/button/ApplyBtn";
import CustomButton from "~/components/common/button/CustomBtn";
import { formatDate } from "~/utils/commonUtils";
interface DataComment {
  id: number;
  Author: string;
  content: string;
  categoryName: string;
  createdAt: string;
}
const BodyReview = () => {
  const renderCorlor = (status: string) => {
    let color = "gray";
    return (
      <span
        className=" rounded p-1 text-white "
        style={{ backgroundColor: color }}
      >
        Pendding
      </span>
    );
  };
  const [isDataUser, setIsDataUser] = useState([]);
  const [search, setSearch] = useState("");
  const [isData, setIsData] = useState([]);
  const columns: TableColumnsType<DataComment> = [
    {
      title: "Author",
      dataIndex: "Author",
    },
    {
      title: "Content",
      dataIndex: "content",
    },
    {
      title: "In Respone To",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      render: (_, record: any) => record && record?.blogPost?.category.name,
    },
    {
      title: "Status",
      render: renderCorlor,
    },
    {
      title: "Submitted",
      dataIndex: "createdAt",
      render: (_, record) => formatDate(record?.createdAt),
    },
  ];
  const getDataUser = async () => {
    const response = await getAllUserComment(true);
    setIsDataUser(response && response);
  };
  React.useEffect(() => {
    getDataUser();
  }, []);
  console.log("data..", isDataUser);
  const userOptions = isDataUser.map((item: any) => ({
    value: item.id,
    label: item.username,
  }));
  const dataAction = [
    { value: "1", label: "Bulk Actions" },
    { value: "2", label: "Approved" },
    { value: "3", label: "Pendding" },
    { value: "4", label: "Spam" },
    { value: "5", label: "Move to trash" },
    { value: "6", label: "Delete" },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => await GetAllComment(true),
  });

  useEffect(() => {
    if (data) {
      setIsData(data);
    }
  }, [data]);
  const handelOnSubmit = async () => {
    const res = await GetAllComment(true, search);
    setIsData(res);
  };

  return (
    <>
      <div className="flex">
        <div>
          <Form>
            <div className="flex">
              <FormItem>
                <Select
                  size="large"
                  defaultValue="Bulk actions"
                  style={{ width: 200 }}
                  //onChange={handleChange}
                  options={dataAction}
                />
              </FormItem>

              <div className=" w-25 ml-3">
                <ApplyBtn></ApplyBtn>
              </div>
            </div>
          </Form>
        </div>
        <div className=" ml-auto">
          <Form onFinish={handelOnSubmit}>
            <div className="flex ">
              <FormItem>
                <Select
                  size="large"
                  defaultValue="--Customer--"
                  style={{ width: 200 }}
                  //onChange={handleChange}
                  options={userOptions}
                >
                  {/* {isDataUser &&
                    isDataUser?.map((item: any) => (
                      <option key={item.id}>{item.username}</option>
                    ))} */}
                </Select>
              </FormItem>
              <FormItem>
                <Input
                  size="large"
                  placeholder="Search by title"
                  style={{ width: 200, marginLeft: 12 }}
                  onChange={(e: any) => setSearch(e.target.value)}
                ></Input>
              </FormItem>
              <div className="w-25 ml-3">
                <CustomButton type="apply" content="Apply" />
              </div>
            </div>
          </Form>
        </div>
      </div>
      <span style={{ marginLeft: 8 }}>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
      </span>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={isData && isData}
        // pagination={false}
      ></Table>
    </>
  );
};
export default BodyReview;
