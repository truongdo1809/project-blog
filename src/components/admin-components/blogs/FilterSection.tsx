"use client";
import { DatePicker, Input, Space } from "antd";
import { useEffect, useRef } from "react";
import Selector from "~/components/common/Selector";
import CustomButton from "~/components/common/button/CustomBtn";

interface FilterSectionProps {
  filterVisible: boolean;
  setFilterVisible: (arg: boolean) => void;
}

const { RangePicker } = DatePicker;

export default function FilterSection({
  filterVisible,
  setFilterVisible,
}: FilterSectionProps) {
  const trigger = useRef<any>(null);
  const filter = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!filter.current || !trigger.current) return;

      if (trigger.current.contains(target)) {
        setFilterVisible(false);
      }
    };

    const triggerCurrent = trigger.current;

    if (triggerCurrent) {
      triggerCurrent.addEventListener("click", clickHandler);
    }

    return () => {
      if (triggerCurrent) {
        triggerCurrent.removeEventListener("click", clickHandler);
      }
    };
  }, [filterVisible, setFilterVisible]);

  const BlogStatus = [
    { value: "1", label: "Approved" },
    { value: "2", label: "Deleted" },
    { value: "3", label: "Pending" },
    { value: "4", label: "Reject" },
  ];

  const handleApply = () => {};

  const handleCancel = () => {};

  return (
    <div
      ref={filter}
      className="filter-section relative border border-solid border-[var(--primary-color)] p-5 mt-6 rounded-md before:border-transparent after:border-transparent after:border-b-white before:border-b-[var(--primary-color)] dark:after:border-b-boxdark-2"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <p className="dark:text-white mb-1">Tiêu đề:</p>
          <Space direction="vertical" size="middle" className="w-full flex-1">
            <Input placeholder="Nhập tiêu đề bài viết" size="middle" />
          </Space>
        </div>
        <div>
          <p className="dark:text-white mb-1">Danh mục:</p>
          <Space direction="vertical" size="middle" className="w-full flex-1">
            <Input placeholder="Nhập danh mục bài viết" size="middle" />
          </Space>
        </div>
        <div>
          <p className="dark:text-white mb-1">Ngày tạo:</p>
          <Space direction="vertical" size="middle" className="w-full flex-1">
            <RangePicker className="w-full" size="middle" />
          </Space>
        </div>
        <div>
          <p className="dark:text-white mb-1">Tác giả:</p>
          <Space direction="vertical" size="middle" className="w-full flex-1">
            <Input placeholder="Nhập vào tác giả" size="middle" />
          </Space>
        </div>
        <div>
          <p className="dark:text-white min-w-16 block mb-1">
            Trạng thái:
          </p>
          <div className="flex-1 blog-status">
            <Selector
              defaultValue={"Chọn trạng thái ... "}
              options={BlogStatus}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-end mt-5 mb-4">
          <div
            ref={trigger}
            onClick={() => setFilterVisible(!filterVisible)}
            aria-controls="filter"
            aria-expanded={filterVisible}
            className="mr-2"
          >
            <CustomButton onClick={handleCancel} type="cancel" content="Cancel" />
          </div>
          <div
            ref={trigger}
            onClick={() => setFilterVisible(!filterVisible)}
            aria-controls="filter"
            aria-expanded={filterVisible}
          >
            <CustomButton onClick={handleApply} content="Apply" type="apply" />
          </div>
        </div>
      </div>
    </div>
  );
}
