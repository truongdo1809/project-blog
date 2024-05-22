"use client";
import { Checkbox, Divider } from "antd";
import type { CheckboxProps } from "antd";
import { useState, useEffect } from "react";

interface FilterColumnProps {
    value: any;
    options: any;
    onColumnSelectionChange: (selectedColumns: string[]) => void;
}

const CheckboxGroup = Checkbox.Group;

const FilterColumns: React.FC<FilterColumnProps> = ({ value, options, onColumnSelectionChange }) => {
    const [checkedList, setCheckedList] = useState<string[]>(options);
    const checkAll = checkedList.length === options.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < options.length;

    useEffect(() => {
        setCheckedList(value);
    }, [value]);

    const onChange = (list: string[]) => {
        setCheckedList(list);
        onColumnSelectionChange(list);
    };

    const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
        const isChecked = e.target.checked;
        const newCheckedList = isChecked ? options : [];
        setCheckedList(newCheckedList);
        onColumnSelectionChange(newCheckedList);
    };

    return (
        <div className="filter-column-section relative h-full border border-solid border-[var(--primary-color)] p-5 mt-6 rounded-md before:border-transparent after:border-transparent after:border-b-white before:border-b-[var(--primary-color)] dark:after:border-b-boxdark-2">
            <div>
                <Checkbox
                    indeterminate={indeterminate}
                    onChange={onCheckAllChange}
                    checked={checkAll}
                >
                    <span className="dark:text-white">Check all</span>
                </Checkbox>
                <Divider className="border-stroke dark:border-strokedark" />
                <CheckboxGroup
                    className="filter-column grid gap-4 grid-cols-2 md:grid-cols-4 xl:grid-cols-7 dark:text-white"
                    options={options}
                    value={checkedList}
                    onChange={onChange}
                />
            </div>
            {/* <div>
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
            </div> */}
        </div>
    );
}

export default FilterColumns;
