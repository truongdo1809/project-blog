"use client";
import { ArrowUpTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { Editor } from "@tinymce/tinymce-react/lib/es2015/main/ts";
import { Flex, Form, Input, Radio, RadioChangeEvent, Select, Space, Typography } from "antd";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import authSlice from "~/app/lib/features/authSlice";
import Breadcrumb from "~/components/admin-components/Breadcrumb";
import ActionButton from "~/components/common/button/ActionBtn";
import CustomButton from "~/components/common/button/CustomBtn";
import { API_URLS, StatusOptions } from "~/utils/commonUtils";

const uploadImage = async (file: File, accessToken: string) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_URLS.UPLOADFILE}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data.filePath;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function NewBlog() {
  const { user } = useSelector(authSlice.selectSlice);
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [content, setContent] = useState("");

 
  

 
  const [categories, setCategories] = useState<any[]>([]);
  const accessToken = user && user.user.accessToken;
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }
  }, [accessToken, router]);

  useEffect(() => {
    if (postId) {
      axios.get(`${API_URLS.GETPOSTBYID}/${postId}`).then((response) => {
        const postData = response.data.data;
        form.setFieldsValue({
          titlePost: postData.title,
          categoryPost: postData.categoryId,
          statusPost: postData.status,
        });
        setContent(postData.content);
        setImageFile(postData.imgUrl || null);
      });
    }
  }, [postId, form]);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["categoryKey"],
    queryFn: async () => {
      const categoriesdata = await axios.get(API_URLS.CATEGORIES);
      setCategories(categoriesdata.data.data);
    },
  });

  const CategoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));


  const onSubmit = async (formData: any) => {
    try {
      let imgUrl = "";
      if (typeof imageFile !== "string" && imageFile && accessToken) {
        imgUrl = await uploadImage(imageFile, accessToken);
      } else if (typeof imageFile === "string" && imageFile && postId) {
        imgUrl = imageFile
      }

      const postData = {
        title: formData.titlePost,
        categoryId: formData.categoryPost,
        status: formData.statusPost,
        content: content,
        imgUrl: imgUrl,
        userId: user?.user.id,
      };

      if (accessToken) {
        const response = await (
          postId ?
          axios.patch(`${API_URLS.UPDATEPOST}/${postId}`, postData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }) :
          axios.post(API_URLS.CREATEPOST, postData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        );

        if (response.data.success) {
          form.resetFields();
          setImageFile(null);
          setContent("");
          if (postId) {
            router.back();
          }
        } else {
          console.error("Error submiting form: ", response.data.error)
        }

        return response.data;
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handlePostImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setImageFile(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setImageFile(null);
  };

  return (
    <div className="mx-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName={postId ? 'Edit post' : 'New Post'} />
      <div className="">
        <Form
          form={form}
          onFinish={onSubmit}
          className="gap-8 grid grid-cols-3"
        >
          <div className="col-span-3 xl:col-span-1 xl:order-last">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4">
                <h3 className="text-xl font-medium dark:text-white">
                  Post&apos;s setting
                </h3>
              </div>
              <div className="p-7">
                <div className="mb-5.5">
                  <Flex vertical gap={16}>
                    <div>
                      <label htmlFor="titlePost"><Typography.Title level={5} className="dark:text-white">Post&apos;s Title: <span className="text-meta-1">*</span></Typography.Title></label>
                      <Form.Item name="titlePost" className="mb-0"
                        rules={[
                          {
                            required: true,
                            message: "Title is required",
                          },
                          {
                            min: 3,
                            message: "Title must be at least 3 characters",
                          },
                          {
                            max: 100,
                            message: "Title must not exceed 100 characters",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Input post's title"
                          name="titlePost"
                          id="titlePost"
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <label htmlFor="titlePost"><Typography.Title level={5} className="dark:text-white">Post&apos;s Category: <span className="text-meta-1">*</span></Typography.Title></label>
                        <Link href="/admin/blogs/categories" className="text-[var(--primary-color)]" target="_blank">New category</Link>
                      </div>
                      <Form.Item name="categoryPost" className="mb-0"
                        rules={[
                          { required: true, message: "Category is required" },
                        ]}
                      >
                        <Select
                          placeholder="Choose category"
                          style={{ width: "100%" }}
                          options={CategoryOptions}
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <label htmlFor="statusPost"><Typography.Title level={5} className="dark:text-white">Post&apos;s status: <span className="text-meta-1">*</span></Typography.Title></label>
                      <Form.Item name="statusPost" className="mb-0"
                        rules={[
                          { required: true, message: "Status is required" },
                        ]}
                      >
                        <Select
                          placeholder="Choose status"
                          style={{ width: "100%" }}
                          options={StatusOptions}
                        />
                      </Form.Item>
                    </div>
                  </Flex>
                </div>
              </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:bg-boxdark mt-8">
              <div className="border-b border-stroke px-7 py-4">
                <h3 className="text-xl font-medium dark:text-white">
                  Post&apos;s photo
                </h3>
              </div>
              <div className="p-7">
                <div
                  id="fileUpload"
                  className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded-lg border border-dashed border-stroke bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                >
                  <div>
                    {imageFile ? (
                      <div className="relative rounded-lg overflow-hidden">
                        <Image
                          width={1000}
                          height={1000}
                          alt="Post's image"
                          src={typeof imageFile === 'string' ? imageFile : URL.createObjectURL(imageFile)}
                          className="object-cover h-full w-full border rounded-lg border-stroke"
                        />
                        <div className="">
                          <ActionButton type="delete" onClick={removeImage} title="Delete image" className="border border-white absolute top-3 right-3 text-meta-1 opacity-70 hover:opacity-100" />
                        </div>
                      </div>
                    ) : (
                      <div className="">
                        <input
                          type="file"
                          name="photoPost"
                          id="photoPost"
                          accept="image/*"
                          onChange={handlePostImageChange}
                          className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                        />
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark text-[var(--primary-color)] dark:text-stroke">
                            <ArrowUpTrayIcon className="w-5 h-5" />
                          </div>
                          <div className="dark:text-white">
                            <span className="text-[var(--primary-color)]">
                              Choose Photo
                            </span>{" "}
                            or Drop image here
                            <p className="text-sm text-center mt-1 text-body">
                              (max size 800px &#10539; 800px)
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3 xl:col-span-2 ">
            <div className="rounded-sm border border-stroke shadow-default dark:bg-boxdark h-full">
              <div className="border-b border-stroke px-7 py-4">
                <h3 className="text-xl font-medium dark:text-white">
                  Post&apos;s content
                </h3>
              </div>

              <div
                className="p-7 flex flex-col"
                style={{ height: "calc(100% - 61px)" }}
              >
                <div className="flex-1 min-h-75">
                  <Editor
                    apiKey="rnohtvo4g07we0d1demik48w25txsr93erf2bwmz45qeicyf"
                    init={{
                      plugins:
                        "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
                      toolbar:
                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                      tinycomments_mode: "embedded",
                      tinycomments_author: "Author name",
                      mergetags_list: [
                        { value: "First.Name", title: "First Name" },
                        { value: "Email", title: "Email" },
                      ],
                      height: "100%",
                    }}
                    value={content}
                    onEditorChange={(content) => {
                      setContent(content);
                    }}
                  />
                </div>
                <div className="flex justify-end h-10 mt-7">
                    <CustomButton content="View post" type="view" className="mr-2" />
                  <div className="w-40">
                    <CustomButton content={postId ? 'Save Changes' : 'Create Post'} type="submit" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}