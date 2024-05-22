"use client";
import { useQuery } from "@tanstack/react-query";
import { Empty, Modal, Skeleton } from "antd";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { LuPencil } from "react-icons/lu";
import {
  MdDeleteOutline,
  MdImageSearch,
} from "react-icons/md";
import {
  deleteFile,
  getFileByFolderId,
  updateFile,
} from "~/app/services_api/services";
import CustomButton from "~/components/common/button/CustomBtn";

const File = ({
  folderId,
  dataFile,
  setDataFile,
  pageFile,
  setPageFile,
}: any) => {
  const [loadMore, setLoadMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [showAction, setShowAction] = useState<{ [key: number]: boolean }>({});
  const [isShowAction, setIsShowAction] = useState(false);
  const [idFileDelete, setIdFileDelete] = useState("");
  const [modalRenameFile, setModalRenameFile] = useState(false);
  const [nameFile, setNameFile] = useState("");
  //react hook form
  interface Form {
    nameFile: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>();

  //call api
  const _fetchDataFile = useCallback(async () => {
    return await getFileByFolderId(pageFile);
  }, [pageFile]);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["file"],
    queryFn: _fetchDataFile,
  });
  useEffect(() => {
    if (data && data.length > 0) {
      setDataFile(data);
    }
  }, [data]);

  useEffect(() => {
    const getDataFile = async () => {
      try {
        const response = await getFileByFolderId(pageFile, folderId);
        setDataFile(response);
      } catch (error) {
        console.log(error);
      }
    };
    getDataFile();
  }, [folderId, setDataFile, pageFile]);

  //  phân trang file
  const loadMoreFile = async () => {
    try {
      setLoadMore(true);
      const newDataFile = await getFileByFolderId(pageFile + 1);
      setDataFile((currentData: any) => [...currentData, ...newDataFile]);
      setPageFile(pageFile + 1);
      setLoadMore(false);
    } catch (error) {
      console.log(error);
      setLoadMore(false);
    }
  };

  const onScroll = useCallback(async () => {
    const container = containerRef.current;
    if (container) {
      const bottomOfContainer = container.scrollTop + container.clientHeight;
      const totalHeight = container.scrollHeight;
      if (bottomOfContainer >= totalHeight - 50 && !isLoading) {
        await loadMoreFile();
      }
    } 
  }, [isLoading, pageFile]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", onScroll);
      return () => container.removeEventListener("scroll", onScroll);
    }
  }, [onScroll]);

  // open modal
  const showModal = (id: number) => {
    setIsModalOpen(true);
    const dataFiles = dataFile.find((file: any) => file.id === id);

    if (dataFiles) {
      setImage(dataFiles.filepath);
      setFileName(dataFiles.filename);
    }
  };
  // đóng modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setShowAction((icon) => ({
      ...icon,
      [idFileDelete]: false,
    }));
  };
  //show action của file
  const handleClickShowAction = (e: any, id: any) => {
    e.preventDefault();
    setIsShowAction(true);
    setIdFileDelete(id);

    const dataFiles = dataFile.find((file: any) => file.id === id);

    if (dataFiles) {
      setNameFile(dataFiles.filename);
    }

    setShowAction((icon) => ({
      ...icon,
      [id]: !icon[id],
    }));
  };

  // đóng actions folder khi click ra bên ngoài
  const fileRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    function handleClickOutside(event: MouseEvent, id: number) {
      if (
        fileRefs.current[id] &&
        fileRefs.current[id]!.contains(event.target as Node)
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

  // delete file
  const handleDeleteFile = async () => {
    setIsShowAction(false);
    setShowAction((icon) => ({
      ...icon,
      [idFileDelete]: false,
    }));
    try {
      await deleteFile(setDataFile, idFileDelete);
    } catch (error) {
      console.log(error);
    }
  };

  //bật modal rename file
  const handleOpenModalRenameFile = () => {
    setModalRenameFile(true);
  };
  //đóng modal rename file

  const handleCancelModalRenameFile = () => {
    setModalRenameFile(false);
    setShowAction((icon) => ({
      ...icon,
      [idFileDelete]: false,
    }));
    reset();
  };
  // Rename file
  const handleRenameFile = async (data: Form) => {
    try {
      await updateFile(idFileDelete, data.nameFile);
      const response = await getFileByFolderId(pageFile);
      setDataFile(response);
      setModalRenameFile(false);
      setShowAction((icon) => ({
        ...icon,
        [idFileDelete]: false,
      }));
      reset();
    } catch (error) {
      setModalRenameFile(false);
      setShowAction((icon) => ({
        ...icon,
        [idFileDelete]: false,
      }));
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div>
        <Skeleton active /> <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </div>
    );
  }
  if (isError) {
    return <div> {JSON.stringify(error)}</div>;
  }

  return (
    <div
      ref={containerRef}
      className="border-l-2 border-[#F3F3F3] h-[560px] overflow-y-auto border-b"
    >
      <div className=" px-3 py-3 flex flex-wrap items-center">
        {dataFile?.map((file: any) => (
          <div
            key={file.index}
            className=" p-2 cursor-pointer relative"
            onContextMenu={(e) => handleClickShowAction(e, file.id)}
          >
            <div onClick={() => showModal(file.id)}>
              <Image
                width={159}
                height={120}
                src={file.filepath || "/pic-1.jpg"}
                className=" max-w-[159px] max-h-[120px] object-contain"
                alt=""
              />
              <div className=" text-[14px] text-center">{file.filename}</div>
            </div>
            <div>
              {showAction[file.id] && (
                <div>
                  <div
                    className={`${
                      isShowAction
                        ? "z-999 w-full h-screen bg-[#c3c2c2] bg-opacity-50 fixed top-0 left-0"
                        : ""
                    }`}
                    ref={(el: any) => (fileRefs.current[file.id] = el)}
                  ></div>
                  <ul className=" absolute -bottom-[120px] left-[12px] z-9999 px-3 py-2 bg-white rounded-md">
                    <li
                      className="    z-[1000] py-1 rounded-t-sm"
                      onClick={() => showModal(file.id)}
                    >
                      <div className=" flex items-center  hover:bg-[#e5e4e4] cursor-pointer py-[6px]  px-[5px]">
                        <MdImageSearch className=" text-[24px] text-[#757575]" />
                        <span className=" pl-2 font-normal">Preview</span>
                      </div>
                    </li>

                    <li
                      className="   z-[1000] py-1 rounded-t-sm"
                      onClick={handleOpenModalRenameFile}
                    >
                      <div className=" flex items-center  hover:bg-[#e5e4e4] cursor-pointer py-[6px] px-[5px]">
                        <LuPencil className=" text-[20px] text-[#757575]" />
                        <span className=" pl-2 font-normal whitespace-nowrap">
                          Rename File
                        </span>
                      </div>
                    </li>
                    <li>
                      <Modal
                        title="Rename File"
                        open={modalRenameFile}
                        onCancel={handleCancelModalRenameFile}
                        footer={null}
                      >
                        <form onSubmit={handleSubmit(handleRenameFile)}>
                          <input
                            {...register("nameFile", {
                              required: "Name file is required",
                              minLength: {
                                value: 3,
                                message:
                                  "file name must be at least 3 characters",
                              },
                              maxLength: {
                                value: 20,
                                message: "file name maximum 20 characters",
                              },
                            })}
                            type="text"
                            placeholder="Enter name file"
                            className=" border w-full px-2 py-2 rounded-lg"
                            value={nameFile}
                            onChange={(e) => setNameFile(e.target.value)}
                          />
                          {errors.nameFile && (
                            <span className=" text-red">
                              {errors.nameFile.message}
                            </span>
                          )}
                          <div className=" flex justify-end pt-6">
                            <CustomButton
                              content=" Rename File"
                              type="submit"
                            />
                          </div>
                        </form>
                      </Modal>
                    </li>
                    <li
                      onClick={handleDeleteFile}
                      className="   z-[1000] py-1 rounded-t-sm"
                    >
                      <div className=" flex items-center  hover:bg-[#e5e4e4] cursor-pointer py-[6px] px-[5px]">
                        <MdDeleteOutline className=" text-[24px] text-[#757575]" />
                        <span className=" pl-2 font-normal">Delete File</span>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
        <Modal
          title="Preview"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Image
            width={500}
            height={500}
            src={image || "/pic-1.jpg"}
            className="  object-cover"
            alt=""
          />
          <div className=" text-center my-3 text-[20px]"> {fileName}</div>
        </Modal>
      </div>
      <div>
        {dataFile.length === 0 && (
          <div>
            <Empty />
          </div>
        )}
      </div>
    </div>
  );
};

export default File;
