"use client";
import React, { useState } from "react";
import { Table, TableColumnsType } from "antd";
import Breadcrumb from "~/components/admin-components/Breadcrumb";
import Link from "next/link";
import CustomButton from "~/components/common/button/CustomBtn";

interface DataType {
  key: React.Key;
  name: string;
  role: string;
  createdAt: string;
  action?: any;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Id",
    dataIndex: "key",
    render: (text: string) => <>#{text}</>,
  },
  {
    title: "User name",
    dataIndex: "name",
    render: (text: string) => (
      <Link href="#" className="text-[var(--primary-color)]">
        {text}
      </Link>
    ),
  },
  {
    title: "Role",
    dataIndex: "role",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    role: "admin",
    createdAt: "16/04/2024",
  },
  {
    key: "2",
    name: "Jim Green",
    role: "author",
    createdAt: "16/04/2024",
  },
  {
    key: "3",
    name: "Joe Black",
    role: "author",
    createdAt: "16/04/2024",
  },
  {
    key: "4",
    name: "Disabled User",
    role: "author",
    createdAt: "16/04/2024",
  },
];

interface RowSelectionProps {
  selectedRowKeys: React.Key[];
  onSelectChange: (selectedRowKeys: React.Key[]) => void;
}

const RowSelection: React.FC<RowSelectionProps> = ({
  selectedRowKeys,
  onSelectChange,
}) => {
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  return (
    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
  );
};

export default function RoleManagerPage() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  return (
    <div className="p-4 md:p-6 2xl:p-10">
      <section>
        <Breadcrumb pageName="Role manager" />
        <div className="flex">
          <CustomButton content="Add role" type="add" />
        
          
        </div>
      </section>

      <section className="mt-6">
        <RowSelection
          selectedRowKeys={selectedRowKeys}
          onSelectChange={handleSelectChange}
        />
      </section>
    </div>
  );
}
