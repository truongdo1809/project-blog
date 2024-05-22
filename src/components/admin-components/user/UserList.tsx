"use client";
import {
  Checkbox,
  Form,
  Input,
  Modal,
  Select,
  Skeleton,
  Space,
  Table,
  TableColumnsType,
  notification,
} from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import authSlice from "~/app/lib/features/authSlice";
import {
  DeleteUser,
  getAllUser,
  getAllUserComment,
} from "../../../app/services_api/services";
import { privateRequest } from "~/app/lib/createInstance";
import { IoEyeSharp } from "react-icons/io5";

import { toast } from "react-toastify";
import CustomButton from "~/components/common/button/CustomBtn";
import FormItem from "antd/es/form/FormItem";
import ActionButton from "~/components/common/button/ActionBtn";

const UserList = () => {
  const [isOpenModalAddUser, setisOpenModalAddUser] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmpassword, setComfirmPassWord] = useState("");
  const [role, setRole] = useState("user");
  const [fileList, setFileList] = useState<any[]>([]);
  const [dataUser, setDataUser] = useState<any>([]);
  const [updateId, setUpdateId] = useState<Number | null>(null);
  const [update, setUpdate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { user } = useSelector(authSlice.selectSlice);
  const [currentPage, setCurrentPage] = useState(1);
  const [oldPassword, setOldPassword] = useState("");
  const [showPassword3, setShowPassword3] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [searchUserName, setSearchUserName] = useState("");
  const [SearchEmail, setSetSearchEmail] = useState("");
  const [dataAllUsers, setDataAllUsers] = useState([]);
  const accessToken = user?.user.accessToken!;
  const renderCorlor = (status: string) => {
    let color = status === "online" ? "blue" : "red";
    return <span style={{ color }}>{status}</span>;
  };
  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedData = dataUser.map((item: any) => ({
      ...item,
      checked: !selectAll,
    }));
    setDataUser(updatedData);
  };
  const toggleRowSelection = (index: number) => {
    const updatedData = [...dataUser];
    updatedData[index].checked = !updatedData[index].checked;
    setDataUser(updatedData);
  };
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const handleShowPassword3 = () => {
    setShowPassword3(!showPassword3);
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", currentPage],
    queryFn: () => getAllUser(false, currentPage, SearchEmail, searchUserName),
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setDataUser(data);
    }
  }, [data]);
  const getAllDataUser = async () => {
    const response = await getAllUser(true, currentPage);
    setDataAllUsers(response);
  };

  // láy ra value ô slect
  useEffect(() => {
    getAllDataUser();
  }, []);
  const optionss =
    dataAllUsers &&
    dataAllUsers.map((data: any) => ({
      value: data.email,
    }));

  if (isLoading) {
    return (
      <div>
        <Skeleton active className="mb-3" />
        <Skeleton active className="mb-3" />
        <Skeleton active className="mb-3" />
        <Skeleton active className="mb-3" />
        <Skeleton active />
      </div>
    );
  }

  if (isError) {
    toast.error("Loading user failed try again");
    return <div>{JSON.stringify(error)}</div>;
  }
  const handleViewUser = (userId: number) => {
    setUpdate(true);
    setShowOldPassword(true);
    const selectedUser =
      data && dataUser.find((user: any) => user.id === userId);
    if (selectedUser) {
      setUsername(selectedUser.username);
      setEmail(selectedUser.email);
      setRole(selectedUser.role);
      setPassword("");
      setComfirmPassWord("");
      setisOpenModalAddUser(true);
      setUpdateId(selectedUser.id);
    }
  };

  const columns: TableColumnsType = [
    {
      title: <Checkbox checked={selectAll} onChange={toggleSelectAll} />,
      render: (_, record, index) => (
        <Checkbox
          checked={record.checked}
          onChange={() => toggleRowSelection(index)}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "username",
    },
    {
      title: "Avt",
      dataIndex: "imgUrl",
      render: (_, record) => (
        <Image
          width={100}
          height={100}
          className=" w-30 h-30 object-cover rounded-full"
          src={"/pic-1.jpg"}
          alt="Image"
        />
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      responsive: ["lg"],
    },
    {
      title: "Status",
      dataIndex: "status",
      responsive: ["md"],
      render: renderCorlor,
    },
    {
      title: "Role",
      dataIndex: "role",
      responsive: ["sm"],
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <ActionButton
            type="edit"
            onClick={() => handleViewUser(record.id)}
            className=" cursor-pointer"
          />
          <ActionButton
            type="delete"
            onClick={() => handleDeleteUser(record.id)}
          />
        </Space>
      ),
    },
  ];
  const handleButtonAddUser = () => {
    setisOpenModalAddUser(true);
    setShowOldPassword(false);
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await privateRequest("post", "/file/upload", formData);

      return response.data.filePath;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      setFileList([file]);
    }
  };

  const handleChangeSelect = (value: any) => {
    setRole(value);
  };

  const handleReloadInput = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setComfirmPassWord("");
    setRole("");
    setFileList([]);
  };
  const handleAddUser = async () => {
    let imgUrl = "";
    try {
      if (update) {
        if (password !== comfirmpassword) {
          notification.error({
            message: "The passwords you entered are not the same",
            duration: 1.5,
          });
          toast.error("");
        } else {
          if (fileList.length > 0 && accessToken) {
            imgUrl = await uploadImage(fileList[0]);
          }
          const userUpdate = {
            username: username,
            email: email,
            role: role,
            password: password,
            imgUrl: imgUrl,
            oldPassword: oldPassword,
          };
          await privateRequest("patch", `/user/${updateId}`, userUpdate);
          notification.success({
            message: "User updated successfully",
            description: "User updated",
            duration: 1.5,
          });
          const newDataUser = await getAllUser(false, currentPage);
          setDataUser(newDataUser);
          setisOpenModalAddUser(false);
        }
      } else {
        if (password !== comfirmpassword) {
          toast.error("The passwords you entered are not the same");
        } else {
          if (fileList.length > 0 && accessToken) {
            imgUrl = await uploadImage(fileList[0]);
          }
          const userData = {
            username: username,
            email: email,
            role: role,
            password: password,
            checked: false,
            imgUrl: imgUrl,
          };
          await privateRequest("post", `/user`, userData);
          notification.success({
            message: "Create user is successfully",
            duration: 1.5,
          });

          const newDataUser = await getAllUser(false, currentPage);
          setDataUser(newDataUser);
          handleReloadInput();
        }
      }
    } catch (error: any) {
      notification.error({
        message: error.response.data.message,
        duration: 1.5,
      });
    }
  };
  const handleDeleteUser = async (userId: number) => {
    try {
      await DeleteUser(userId, setDataUser);
      notification.success({
        message: `successfully`,
        description: "Comment deleted successfully",
      });
    } catch (error: any) {
      notification.error({
        message: "delete failed",
        description: error.response.data.message,
        duration: 1.5,
      });
    }
  };

  const handleSearch = async () => {
    const res = await getAllUser(
      true,
      currentPage,
      searchUserName,
      SearchEmail
    );
    setDataUser(res);
  };

  return (
    <>
      <Modal
        title={update ? "Update User" : "Create user"}
        open={isOpenModalAddUser}
        footer={null}
        onCancel={() => {
          setisOpenModalAddUser(false);
          setUsername("");
          setEmail("");
          setPassword("");
          setComfirmPassWord("");
          setRole("");
          setFileList([]);
          setUpdate(false);

          setOldPassword("");
        }}
      >
        <Form onFinish={handleAddUser}>
          <Form.Item name="username" label="user name *">
            <Input
              required
              name="username"
              type="text"
              placeholder="input your user name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="email *">
            <Input
              required
              name="email"
              type="text"
              placeholder="input your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          {showOldPassword && (
            <Form.Item label="oldPassword *" className=" relative">
              <Input
                type={showPassword3 ? "text" : "password"}
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <div
                className="text-xl absolute top-[6px] right-2 cursor-pointer"
                onClick={handleShowPassword3}
              >
                <IoEyeSharp />
              </div>
            </Form.Item>
          )}
          <Form.Item label="password *" className=" relative">
            <Input
              required
              name="password"
              type={showPassword ? "number" : "password"}
              placeholder="input your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div
              className="text-xl absolute top-[6px] right-2"
              onClick={handleShowPassword}
            >
              <IoEyeSharp />
            </div>
          </Form.Item>
          <Form.Item label="confirm password *" className=" relative">
            <Input
              required
              name="comfirmpassword"
              type={showPassword2 ? "number" : "password"}
              placeholder="confirm your password"
              value={comfirmpassword}
              onChange={(e) => setComfirmPassWord(e.target.value)}
            />

            <div
              className="text-xl absolute top-[6px] right-2"
              onClick={handleShowPassword2}
            >
              <IoEyeSharp />
            </div>
          </Form.Item>
          <Form.Item label="role" name="role">
            <Select
              value={role}
              onChange={handleChangeSelect}
              defaultValue={"user"}
            >
              <Select.Option value={"user"}>User</Select.Option>
              <Select.Option value={"admin"}>Admin</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="avatar">
            <Input type="file" onChange={handleAvatarChange} />
          </Form.Item>
          <div className=" flex justify-end">
            <button className=" text-white bg-[var(--primary-color)] h-10 items-center px-6 rounded-md hover:bg-[#4096ff]">
              {update ? "Update User" : "Create user"}
            </button>
          </div>
        </Form>
      </Modal>
      <div className=" flex justify-between">
        <CustomButton
          content="New user"
          onClick={handleButtonAddUser}
          type="add"
        />

        <Form className=" flex " onFinish={handleSearch}>
          <div>
            <FormItem>
              <Select
                size="large"
                defaultValue="--Customer--"
                placeholder="--Customer--"
                onChange={(value) => {
                  setSetSearchEmail(value);
                }}
                options={optionss}
                allowClear
                style={{ width: 200 }}
              ></Select>
            </FormItem>
          </div>
          <div>
            <FormItem>
              <Input
                value={searchUserName}
                size="large"
                placeholder="Search by title"
                className="ml-3 "
                onChange={(e) => setSearchUserName(e.target.value)}
              ></Input>
            </FormItem>
          </div>
          <div className="w-25 ml-5">
            <CustomButton
              type="apply"
              content="apply"
              className=" cursor-pointer"
            ></CustomButton>
          </div>
        </Form>
      </div>

      <Table
        columns={columns}
        dataSource={dataUser}
        pagination={false}
        rowKey={(record) => record.name}
      />
      <div className="flex justify-center mt-8 " onClick={handleNextPage}>
        <button className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg hover:bg-[var(--secondary-color)]">
          Load More
        </button>
      </div>
    </>
  );
};

export default UserList;
