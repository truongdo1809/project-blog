"use client";
import React, { useState } from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import authSlice, { User } from "~/app/lib/features/authSlice";
import Image from "next/image";
import style from "../profile/profile.module.css";
import { privateRequest } from "~/app/lib/createInstance";
import { IoEyeSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useSelector(authSlice.selectSlice);
  const [newUsername, setNewUsername] = useState(user?.user?.username || "");
  const [fileList, setFileList] = useState<any[]>([]);
  const accessToken = user?.user.accessToken;
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user?.user?.email || "");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const dispatch = useDispatch();
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
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const handleShowPassword3 = () => {
    setShowPassword3(!showPassword3);
  };
  const onFinish = async () => {
    let imgUrl = "";
    try {
      if (fileList.length > 0 && accessToken) {
        imgUrl = await uploadImage(fileList[0]);
      }
      if (password !== confirmPassword) {
        toast.error("The passwords you entered are not the same try again");
      } else {
        const userData = {
          username: newUsername,
          imgUrl: imgUrl,
          oldPassword: oldPassword,
          password: password,
          email: email,
        };
        const mergedUserData: User = {
          ...user,
          user: {
            ...user!.user,
            imgUrl: imgUrl || "",
            username: newUsername,
            email: email,
          },
        };
        await privateRequest("patch", `/user/${user?.user?.id}`, userData);
        dispatch(authSlice.actions.updateUser(mergedUserData));
        setOldPassword("");
        setPassword("");
        setConfirmPassword("");
        toast.success("upload profile is  successfully");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      setFileList([file]);
    }
  };

  return (
    <div className="my-[100px]">
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 700, margin: "auto" }}
        onFinish={onFinish}
      >
        <Form.Item
          valuePropName="fileList"
          className="flex justify-center items-center"
        >
          <div className={style["avatar"]}>
            <Image
              width={200}
              height={200}
              src={fileList.length > 0 ? URL.createObjectURL(fileList[0]) : ""}
              alt="avatar"
            />
            <span>
              <i className="fas fa-camera"></i>
              <p>Avatar</p>
              <input
                type="file"
                name="file"
                id={style["file_up"]}
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </span>
          </div>
        </Form.Item>
        <Form.Item
          label="UserName"
          rules={[
            {
              required: true,
              message: "UserName is required",
            },
            {
              min: 3,
              message: "UserName must be at least 3 characters",
            },
            {
              max: 50,
              message: "UserName must not exceed 50 characters",
            },
          ]}
        >
          <Input
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          rules={[
            {
              required: true,
              message: "Email is required",
            },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "email is in wrong format",
            },
          ]}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item label="oldPassword" className=" relative">
          <Input
            required
            type={showPassword3 ? "text" : "password"}
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
        <Form.Item label="password" className=" relative">
          <Input
            required
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="text-xl absolute top-[6px] right-2 cursor-pointer"
            onClick={handleShowPassword}
          >
            <IoEyeSharp />
          </div>
        </Form.Item>
        <Form.Item label="confirm password" className=" relative">
          <Input
            required
            type={showPassword2 ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div
            className="text-xl absolute top-[6px] right-2 cursor-pointer"
            onClick={handleShowPassword2}
          >
            <IoEyeSharp />
          </div>
        </Form.Item>
        <Form.Item
          wrapperCol={{ offset: 4, span: 14 }}
          className="flex justify-center items-center"
        >
          <button
            type="submit"
            className="py-3 px-[90px] rounded-2xl bg-[var(--primary-color)] text-white"
          >
            Update
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
