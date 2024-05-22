"use client";
import React, { useEffect, useState } from "react";
import { LuFolderPlus } from "react-icons/lu";
import { IoIosSearch, IoMdArrowUp } from "react-icons/io";
import Folder from "./Folder";
import File from "./File";
import { Input, Modal, Select } from "antd";
import { useForm } from "react-hook-form";
import CustomButton from "~/components/common/button/CustomBtn";
import {
  createFile,
  createFolder,
  getAllFolder,
  getDataSearchFile,
  getFileByFolderId,
} from "~/app/services_api/services";
import { toast } from "react-toastify";
import { FaHome } from "react-icons/fa";
import { convertFlatToTreeFolders } from "~/app/utils/convertFolder";
import { useQuery } from "@tanstack/react-query";

interface Form {
  nameFolder: string;
}


function MediaManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [dataFolder, setDataFolder] = useState<any[]>([]);
  const [dataFile, setDataFile] = useState<any[]>([]);
  const [selectFolder, setSelectFolder] = useState("");
  const [fileList, setFileList] = useState<any[]>([]);
  const [search, setSearch] = useState(false);
  const [folderId, setFolderId] = useState();
  const [searchFile, setSearchFile] = useState("");
  const [pageFile, setPageFile] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>();
  // show search
  const handleShowSearch = () => {
    setSearch((item) => !item);
  };
  // open modal
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };
  const handleCancelAddFile = () => {
    setIsModalOpen2(false);
    setSelectFolder("");
    setFileList([]);
  };
  const showModalAddFile = () => {
    setIsModalOpen2(true);
  };
  //add new folder
  const handleAddFolder = async (data: any) => {
    try {
      const response = await createFolder(data.nameFolder);
      setDataFolder((prevDataFolder) => [...prevDataFolder, response.folder]);
      toast.success("created folder");
      reset();

      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  // add new file
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      setFileList([file]);
    }
  };
  const handleChangeFolder = (value: any) => {
    setSelectFolder(value);
  };
  const handleUpLoadFile = async (e: any) => {
    e.preventDefault();
    try {
      if ((fileList[0], selectFolder)) {
        const response = await createFile(fileList[0], selectFolder);
        setDataFile((prevDataFile) => [...prevDataFile, response.data]);
        toast.success("Create file successfully");
        setIsModalOpen2(false);
        setSelectFolder("");
        setFileList([]);
      }
    } catch (error) {
      console.log(error);
      setIsModalOpen2(false);
    }
  };
  // search
  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (searchFile) {
      try {
        const response = await getDataSearchFile(searchFile);
        setDataFile(response);
        setSearchFile("");
      } catch (error) {
        console.log(error);
      }
    }
  };
  // // quay về home render ra hết file
  const handleHomeRender = async () => {
    try {
      const response = await getFileByFolderId(pageFile);
      setDataFile(response);
    } catch (error) {
      console.log(error);
    }
  };

  //call api render folder
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["folder"],
    queryFn: () => getAllFolder(true),
  });
  useEffect(() => {
    if (data && data.length > 0) {
      setDataFolder(data);
    }
  }, [data, setDataFolder]);
  return (
    <div className=" fixed  left-[220px] top-[50px] w-[calc(100%-220px)]">
      <div className=" text-center my-4 font-bold text-2xl bg-[#F3F3F3]">
        File Manenger
      </div>
      <div className=" flex justify-between items-center p-2 border-b-2 border-b-[#F3F3F3]">
        <div className=" flex items-center">
          <div
            className=" flex items-center p-1  hover:bg-[#F3F3F3] cursor-pointer"
            onClick={handleHomeRender}
          >
            <FaHome className="text-2xl mr-2" />
            <span>Home</span>
          </div>
          <div
            className=" flex items-center p-1  hover:bg-[#F3F3F3] cursor-pointer"
            onClick={showModal}
          >
            <LuFolderPlus className=" text-2xl mr-2" />
            <span>New Folder</span>
          </div>
          <div>
            <Modal
              title="Create Folder"
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}
            >
              <form onSubmit={handleSubmit(handleAddFolder)}>
                <input
                  {...register("nameFolder", {
                    required: "Name Folder is required",
                    minLength: {
                      value: 3,
                      message: "Folder name must be at least 3 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "folder name maximum 20 characters",
                    },
                  })}
                  type="text"
                  placeholder="Enter name folder"
                  className=" border w-full px-2 py-2 rounded-lg"
                />
                {errors.nameFolder && (
                  <span className=" text-red">{errors.nameFolder.message}</span>
                )}
                <div className=" flex justify-end pt-6">
                  <CustomButton content="Create Folder" type="submit" />
                </div>
              </form>
            </Modal>
          </div>
          <div
            className="flex items-center p-1 hover:bg-[#F3F3F3] cursor-pointer"
            onClick={showModalAddFile}
          >
            <IoMdArrowUp className="text-2xl mr-2" />
            <span>Upload</span>
          </div>
          <Modal
            title="Create file"
            open={isModalOpen2}
            onCancel={handleCancelAddFile}
            footer={null}
          >
            <form onSubmit={handleUpLoadFile}>
              <div>
                <label className=" mb-2 block">chọn file</label>
                <Input
                  type="file"
                  name="file"
                  accept="image/*"
                  onChange={handleChangeFile}
                  required
                />
              </div>
              <div>
                <label className=" mb-2 mt-3 block">chọn Folder</label>
                <Select
                  defaultValue={"select forder"}
                  onChange={handleChangeFolder}
                >
                  {dataFolder &&
                    dataFolder.length > 0 &&
                    dataFolder.map((item: any) => (
                      <Select.Option  value={item.id} key={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </div>
              <div className=" flex justify-end pt-6">
                <CustomButton content="Create File" type="submit" />
              </div>
            </form>
          </Modal>
        </div>

        <div>
          <form className=" flex items-center" onSubmit={handleSearch}>
            {search && (
              <div>
                <Input
                  required
                  value={searchFile}
                  onChange={(e) => setSearchFile(e.target.value)}
                />
              </div>
            )}
            <button
              type="submit"
              className=" flex items-center  p-1  hover:bg-[#F3F3F3] cursor-pointer"
              onClick={handleShowSearch}
            >
              <IoIosSearch className=" text-2xl mr-2" />
              <span>Find</span>
            </button>
          </form>
        </div>
      </div>
      <div className=" flex ">
        <div>
          {convertFlatToTreeFolders(dataFolder).map((folder: any) => (
            <Folder
              key={folder.id}
              folder={folder}
              setDataFolder={setDataFolder}
              setFolderId={setFolderId}
              isLoading={isLoading}
              isError={isError}
              error={error}
            />
          ))}
        </div>
        <div className=" w-full ">
          <File
            folderId={folderId}
            searchFile={searchFile}
            dataFile={dataFile}
            setDataFile={setDataFile}
            pageFile={pageFile}
            setPageFile={setPageFile}
          />
        </div>
      </div>
    </div>
  );
}

export default MediaManager;
