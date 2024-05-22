"use client";

import { Button, Form, Input, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { privateRequest } from "~/app/lib/createInstance";
import authSlice, { User } from "~/app/lib/features/authSlice";


const ProfileEdit = () => {
  const [password, setPassword] = useState("");
  const [comfirmPassword, setcomfirmPassword] = useState("");
  const { user } = useSelector(authSlice.selectSlice);
  const [username, setUsername] = useState(user?.user.username || "");
  const [email, setEmail] = useState(user?.user.email || "");

  const [oldPassword, setOldPassword] = useState("");
  const dispatch = useDispatch();

  const onFinish = async () => {
    try {
      if (password !== comfirmPassword) {
        toast.error("The passwords you entered are not the same");
      } else {
        const dataForm = {
          username: username,
          email: email,
          password: password,
          oldPassword: oldPassword,
        };
        const mergedUserData: User = {
          ...user,
          user: {
            ...user!.user,
            email: email,
            username: username,
          },
        };
        await privateRequest("patch", `/user/${user?.user?.id}`, dataForm);
        dispatch(authSlice.actions.updateUser(mergedUserData));
        setPassword("");
        setOldPassword("");
        setcomfirmPassword("");
        toast.success("upload profile is  successfully");
      }
    } catch (error: any) {
      toast.error(error.response.data.message) ||
        toast.error("Upload profile failed try again");
    }
  };
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white h-full">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold">Edit profile</h4>
      </div>

      <Form
        onFinish={onFinish}
        className="border-t border-stroke dark:border-strokedark"
      >
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row"></div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-black dark:text-white"
              >
                Email
                <span className="text-meta-1">*</span>
              </label>
              <Form.Item
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
                <Input
                  value={email}
                  placeholder="Your email"
                  name="email"
                  id="email"
                  size="large"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
            </div>

            <div className="w-full xl:w-1/2">
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-black dark:text-white"
              >
                Name
                <span className="text-meta-1">*</span>
              </label>
              <Form.Item
              // rules={[
              //   {
              //     required: true,
              //     message: "UserName is required",
              //   },
              //   {
              //     min: 3,
              //     message: "UserName must be at least 3 characters",
              //   },
              //   {
              //     max: 50,
              //     message: "UserName must not exceed 50 characters",
              //   },
              // ]}
              >
                <Input
                  required
                  value={username}
                  placeholder="Your name"
                  name="username"
                  id="username"
                  size="large"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label
                htmlFor="oldPassword"
                className="mb-2 block text-sm font-medium text-black dark:text-white"
              >
                oldPassword
                <span className="text-meta-1">*</span>
              </label>
              <Form.Item
                // rules={[
                //   {
                //     required: true,
                //     message: "oldPassword is required",
                //   },
                // ]}
                name="oldPassword"
              >
                <Input.Password
                  required
                  value={oldPassword}
                  placeholder="Your password"
                  name="oldPassword"
                  id="oldPassword"
                  size="large"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Form.Item>
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-black dark:text-white"
              >
                Password
                <span className="text-meta-1">*</span>
              </label>
              <Form.Item
                name="password"
                // rules={[
                //   {
                //     required: true,
                //     message: "Title is required",
                //   },
                //   {
                //     min: 6,
                //     message: "Password must be at least 6 characters",
                //   },
                //   {
                //     max: 25,
                //     message: "Password must be a maximum of 25 characters",
                //   },
                // ]}
              >
                <Input.Password
                  required
                  value={password}
                  placeholder="Your password"
                  name="password"
                  id="password"
                  size="large"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
            </div>

            <div className="w-full xl:w-1/2">
              <label
                htmlFor="ConfirmPassword"
                className="mb-2 block text-sm font-medium text-black dark:text-white"
              >
                Comfirm Password
                <span className="text-meta-1">*</span>
              </label>
              <Form.Item
                name="ConfirmPassword"
                // rules={[
                //   {
                //     required: true,
                //     message: "confirmPassword is required",
                //   },
                // ]}
              >
                <Input.Password
                  required
                  value={comfirmPassword}
                  placeholder="Comfirm Your password"
                  name="ConfirmPassword"
                  id="ConfirmPassword"
                  size="large"
                  onChange={(e) => setcomfirmPassword(e.target.value)}
                />
              </Form.Item>
            </div>
          </div>


          <button
            type="submit"
            className="py-3 w-full rounded-2xl bg-[var(--primary-color)] text-white cursor-pointer"
          >
            Update
          </button>

        </div>
      </Form>
    </div>
  );
};

export default ProfileEdit;
