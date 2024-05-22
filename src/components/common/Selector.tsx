"use client";
import React from "react";
import { Select, Space } from "antd";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

interface SelectorProps {
  defaultValue?: string;
  options: { value: string; label: string; disabled?: boolean }[];
  disabled?: boolean;
  loading?: boolean;
  allowClear?: boolean;
  onChange?: (value: string) => void;
  register?: UseFormRegister<any>;
  setValue?: UseFormSetValue<any>;
}

const Selector: React.FC<SelectorProps> = ({
  defaultValue,
  options,
  disabled,
  loading,
  allowClear,
  onChange,
}) => {
  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
    console.log(`selected ${value}`);
  };

  return (
    <Space wrap>
      <Select
        size="middle"
        defaultValue={defaultValue}
        style={{ width: 120 }}
        onChange={handleChange}
        disabled={disabled}
        loading={loading}
        allowClear={allowClear}
        options={options}
      />
    </Space>
  );
};

export default Selector;