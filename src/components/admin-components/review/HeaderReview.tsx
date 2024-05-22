"use client";
import { useQuery } from "@tanstack/react-query";
import { Form, Input, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useCallback, useState } from "react";
import { getAllUser } from "~/app/services_api/services";
import ApplyBtn from "~/components/common/button/ApplyBtn";

const HeaderReview = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const _fetchAllUser = useCallback(async () => {
    return;
  }, []);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getAllUser(false,currentPage),
  });
  console.log("data 25255", data);
  const dataAction = [
    { value: "1", label: "Bulk Actions" },
    { value: "2", label: "Approved" },
    { value: "3", label: "Pendding" },
    { value: "4", label: "Spam" },
    { value: "5", label: "Move to trash" },
    { value: "6", label: "Delete" },
  ];
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
          <Form>
            <div className="flex ">
              <FormItem>
                <Select
                  size="large"
                  defaultValue="--Customer--"
                  style={{ width: 200 }}
                  //onChange={handleChange}
                >
                  {data &&
                    data.users.map((item: any) => (
                      <option key={item.id}>{item.username}</option>
                    ))}
                </Select>
              </FormItem>
              <FormItem>
                <Input
                  size="large"
                  placeholder="Search by title"
                  style={{ width: 200, marginLeft: 12 }}
                ></Input>
              </FormItem>
              <div className="w-25 ml-3">
                <ApplyBtn></ApplyBtn>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default HeaderReview;
