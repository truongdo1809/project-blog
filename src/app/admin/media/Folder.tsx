"use client";
import { useQuery } from "@tanstack/react-query";
import { Modal, Skeleton } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegFolder } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import { MdDeleteOutline, MdOutlineCreateNewFolder } from "react-icons/md";
import {
  createFolderChild,
  deleteFolders,
  getAllFolder,
  updateFolder,
} from "~/app/services_api/services";
import CustomButton from "~/components/common/button/CustomBtn";
import { Folder as FolderTypes } from "~/types/folder";

const Folder = ({
  folder,
  setDataFolder,
  setFolderId,
  isLoading,
  isError,
  error,
}: any) => {
  const [showIcon, setShowIcon] = useState<{ [key: number]: boolean }>({});
  const [showAction, setShowAction] = useState<{ [key: number]: boolean }>({});
  const [isShowAction, setIsShowAction] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameFolder, setNameFolder] = useState("");
  const [folderChild, setDataFolderChild] = useState(false);
  const [showFolderChild, setShowFolderChild] = useState(false);
  const [idFolderDelete, setIdFolderDelete] = useState("");
  interface Form {
    nameFolder: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>();

  // đóng actions folder khi click ra bên ngoài
  const folderRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    function handleClickOutside(event: MouseEvent, id: number) {
      if (
        folderRefs.current[id] &&
        folderRefs.current[id]!.contains(event.target as Node)
      ) {
        setShowAction((prevShowAction) => ({
          ...prevShowAction,
          [id]: false,
        }));
      }
    }
    const eventListeners: [string, (event: MouseEvent, id: number) => void][] =
      [];
    for (const id in showAction) {
      if (showAction[id]) {
        const listener = (event: MouseEvent) =>
          handleClickOutside(event, parseInt(id));
        document.addEventListener("mousedown", listener as EventListener);
        eventListeners.push(["mousedown", listener]);
      }
    }

    return () => {
      eventListeners.forEach(([type, listener]) => {
        document.removeEventListener(type, listener as EventListener);
      });
    };
  }, [showAction]);
  if (isLoading) {
    return (
      <div>
        <Skeleton active /> <Skeleton active /> <Skeleton active />
        <Skeleton active />
      </div>
    );
  }
  if (isError) {
    return <div> {JSON.stringify(error)}</div>;
  }

  // open folder
  const handleClickFolder = (id: number) => {
    setShowFolderChild((prev) => !prev);
    setShowIcon((icon) => ({
      ...icon,
      [id]: !icon[id],
    }));
    setFolderId(id);
  };
  // show các action của folder
  const handleClickShowAction = (e: any, id: any) => {
    e.preventDefault();
    const folders = folder.id === id;

    if (folders) {
      setNameFolder(folder.name);
    }

    setIdFolderDelete(id);
    setIsShowAction(true);
    setShowAction((icon) => ({
      ...icon,
      [id]: !icon[id],
    }));
  };
  
  // delete folder
  const handleDeleteFolder = async () => {
    setIsShowAction(false);
    setShowAction((icon) => ({
      ...icon,
      [idFolderDelete]: false,
    }));
    try {
      await deleteFolders(setDataFolder, idFolderDelete);
    } catch (error) {
      console.log(error);
    }
  };

  // open modal đổi tên folder
  // open modal
  const showModal = () => {
    setIsModalOpen(true);
  };
  // đóng modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setShowAction((icon) => ({
      ...icon,
      [idFolderDelete]: false,
    }));
    reset();
  };
  // sửa tên folder và create folder con
  const handleRenameFolder = async (data: Form) => {
    try {
      if (folderChild) {
        await createFolderChild(idFolderDelete, data.nameFolder);
        const response = await getAllFolder(true);
        setDataFolder(response);
        setIsModalOpen(false);
        setShowAction((icon) => ({
          ...icon,
          [idFolderDelete]: false,
        }));
        reset();
      } else {
        await updateFolder(idFolderDelete, data.nameFolder);
        const response = await getAllFolder(true);
        setDataFolder(response);
        setIsModalOpen(false);
        setShowAction((icon) => ({
          ...icon,
          [idFolderDelete]: false,
        }));
        reset();
      }
    } catch (error) {
      setIsModalOpen(false);
      setShowAction((icon) => ({
        ...icon,
        [idFolderDelete]: false,
      }));
      console.log(error);
    }
  };

  // create folder con

  const handleOpenModalCeateChildFolder = () => {
    setDataFolderChild(true);
    setIsModalOpen(true);
    setNameFolder("");
  };
  console.log(folder);
  const renderChildFolders = (parentFolder: FolderTypes) => {
    return (
      parentFolder.folders && (
        <ul className="ml-4">
          {parentFolder.folders.map((childFolder: FolderTypes) => (
            <li
              key={childFolder.id}
              className="py-2 border-l-2 border-slate-200 pl-2"
            >
              <Folder
                folder={childFolder}
                setDataFolder={setDataFolder}
                setFolderId={setFolderId}
                isLoading={isLoading}
                isError={isError}
                error={error}
              />
            </li>
          ))}
        </ul>
      )
    );
  };
  return (
    <div className=" max-w-300px">
      <div
        onClick={() => handleClickFolder(folder.id)}
        onContextMenu={(e) => handleClickShowAction(e, folder.id)}
      >
        <div className=" pr-5 hover:bg-[#F3F3F3] relative cursor-pointer">
          <div className=" ">
            <div className=" flex items-center p-1    relative pl-[25px]">
              {!(folder.folders.length === 0) && (
                <div className=" absolute left-[10px] top-[7px]">
                  {showIcon[folder.id] ? (
                    <IoIosArrowDown className=" text-[15px] " />
                  ) : (
                    <IoIosArrowUp className="  text-[15px] " />
                  )}
                </div>
              )}
              <FaRegFolder className=" text-[20px] mr-2 ml-1" />
              <span className=" whitespace-nowrap text-[15px]">
                {folder.name}
              </span>
            </div>
          </div>

          {showAction[folder.id] && (
            <div>
              <div
                className={`${
                  isShowAction
                    ? "z-999 w-full h-screen bg-[#c3c2c2] bg-opacity-50 fixed top-0 left-0"
                    : ""
                }`}
                ref={(el: any) => (folderRefs.current[folder.id] = el)}
              ></div>
              <ul className=" absolute -bottom-[130px] left-[5px] z-9999 px-3 pl-1 pr-3 bg-white rounded-md">
                <li
                  className="    z-[1000] py-1 rounded-t-sm"
                  onClick={handleOpenModalCeateChildFolder}
                >
                  <div className=" flex items-center  hover:bg-[#e5e4e4] cursor-pointer py-[6px]  px-[5px]">
                    <MdOutlineCreateNewFolder className=" text-[24px] text-[#757575]" />
                    <span className=" pl-2 font-normal">New Folder</span>
                  </div>
                </li>

                <li
                  className="   z-[1000] py-1 rounded-t-sm"
                  onClick={showModal}
                >
                  <div className=" flex items-center  hover:bg-[#e5e4e4] cursor-pointer py-[6px] px-[5px]">
                    <LuPencil className=" text-[20px] text-[#757575]" />
                    <span className=" pl-2 font-normal whitespace-nowrap">
                      Rename Folder
                    </span>
                  </div>
                </li>
             <li>                 
               <Modal
                    title={folderChild ? "Create Folder" : " Rename Folder"}   open={isModalOpen} onCancel={handleCancel} footer={null}     >                   
                    <form onSubmit={handleSubmit(handleRenameFolder)}>
                      <input
                        {...register("nameFolder", {
                          required: "Name Folder is required",
                          minLength: {
                            value: 3,
                            message:
                              "Folder name must be at least 3 characters",
                          },
                          maxLength: {
                            value: 20,
                            message: "folder name maximum 20 characters",
                          },
                        })}
                        type="text"
                        placeholder="Enter name folder"
                        value={nameFolder}
                        className=" border w-full px-2 py-2 rounded-lg"
                        onChange={(e) => setNameFolder(e.target.value)}
                      />
                      {errors.nameFolder && (
                        <span className=" text-red">
                          {errors.nameFolder.message}
                        </span>
                      )}
                      <div className=" flex justify-end pt-6">
                        <CustomButton
                          content={
                            folderChild ? "Create Folder" : " Rename Folder"
                          }
                          type="submit"
                        />
                      </div>
                    </form>
                  </Modal>
                </li>
                <li
                  onClick={handleDeleteFolder}
                  className="   z-[1000] py-1 rounded-t-sm"
                >
                  <div className=" flex items-center  hover:bg-[#e5e4e4] cursor-pointer py-[6px] px-[5px]">
                    <MdDeleteOutline className=" text-[24px] text-[#757575]" />
                    <span className=" pl-2 font-normal">Delete</span>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {showFolderChild && renderChildFolders(folder)}
    </div>
  );
};

export default Folder;
