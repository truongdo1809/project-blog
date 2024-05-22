"use client";
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Checkbox, Divider } from "antd";
import type { CheckboxProps, GetProp } from "antd";
import { useState } from "react";

type CheckboxValueType = GetProp<typeof Checkbox.Group, "value">[number];

const CheckboxGroup = Checkbox.Group;
const plainOptions = [
  "Id",
  "Title",
  "Categories",
  "Date created",
  "Status",
  "View full blog",
  "Actions",
];
const defaultCheckedList = [
  "Id",
  "Title",
  "Categories",
  "Date created",
  "Status",
  "View full blog",
  "Actions",
];

export default function FilterColumnSection() {
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[]>(defaultCheckedList);
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;
  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  return (
    <div className="border border-solid border-stroke p-5 my-5 rounded-lg bg-stroke dark:bg-meta-4">
      <div>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          <span className="dark:text-white">Check all</span>
        </Checkbox>
        <Divider />
        <CheckboxGroup
          className="filter-column grid gap-4 grid-cols-2 md:grid-cols-4 xl:grid-cols-7 dark:text-white"
          options={plainOptions}
          value={checkedList}
          onChange={onChange}
        />
      </div>
      <div>
        <div className="flex justify-center mt-5 xsm:justify-end">
          <div className="flex items-center justify-center text-white border border-stroke py-1.5 px-2 min-w-[100px] xsm:min-w-[110px] xsm:px-4 rounded bg-meta-5 opacity-80 hover:opacity-100 mr-2">
            <ArrowUturnLeftIcon className="w-4 h-4 mr-1" /> Reset
          </div>
          <div className="flex items-center justify-center text-white border border-stroke py-1.5 px-2 min-w-[100px] xsm:min-w-[110px] xsm:px-4 rounded bg-meta-1 opacity-80 hover:opacity-100 mr-2">
            <XMarkIcon className="w-5 h-5 mr-1" /> Cancel
          </div>
          <div className="flex items-center justify-center text-white border border-stroke py-1.5 px-2 min-w-[100px] xsm:min-w-[110px] xsm:px-4 rounded bg-meta-3 opacity-80 hover:opacity-100">
            <ArrowUturnRightIcon className="w-4 h-4 mr-1" /> Apply
          </div>
        </div>
      </div>
    </div>
  );
}
