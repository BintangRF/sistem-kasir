import React, { useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Table, Input, Select, DatePicker, Button, Space } from "antd";
import moment from "moment";

const { Option } = Select;

interface ReusableTableProps {
  data: any[];
  columns: any[];
  onAdd?: () => void;
  onEdit?: (record: any) => void;
  onDelete?: (id: number) => void;
  showExport?: boolean;
}

const SelectFilter = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
  handleSearch,
  handleReset,
  dataIndex,
  options,
  placeholder,
  multiSelect = false,
}: any) => (
  <div style={{ padding: 8 }}>
    <Select
      mode={multiSelect ? "multiple" : undefined}
      style={{ width: 200 }}
      placeholder={placeholder}
      value={selectedKeys}
      onChange={(value) =>
        setSelectedKeys(value ? (multiSelect ? value : [value]) : [])
      }
    >
      {options.map((option: { value: string; label: string }) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
    <div style={{ marginTop: 8 }}>
      <Button onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}>
        Search
      </Button>
      <Button onClick={() => handleReset(clearFilters, dataIndex)}>
        Reset
      </Button>
    </div>
  </div>
);

const DateFilter = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
  handleSearch,
  handleReset,
  dataIndex,
}: any) => (
  <div style={{ padding: 8 }}>
    <DatePicker
      style={{ width: 200 }}
      onChange={(date) => {
        if (date) {
          setSelectedKeys([date.format("YYYY-MM-DD")]);
        } else {
          setSelectedKeys([]);
        }
      }}
    />
    <div style={{ marginTop: 8 }}>
      <Button onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}>
        Search
      </Button>
      <Button onClick={() => handleReset(clearFilters, dataIndex)}>
        Reset
      </Button>
    </div>
  </div>
);

const DefaultFilter = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
  handleSearch,
  handleReset,
  dataIndex,
  title,
}: any) => (
  <div style={{ padding: 8 }}>
    <Input
      placeholder={`Search ${title}`}
      value={selectedKeys[0]}
      onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
      onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
    />
    <div style={{ marginTop: 8 }}>
      <Button onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}>
        Search
      </Button>
      <Button onClick={() => handleReset(clearFilters, dataIndex)}>
        Reset
      </Button>
    </div>
  </div>
);

const generateFilterDropdown = (
  col: any,
  handleSearch: any,
  handleReset: any
) => {
  if (col.filterType === "select") {
    return (props: any) => (
      <SelectFilter
        {...props}
        multiSelect={col.multiSelect}
        handleSearch={handleSearch}
        handleReset={handleReset}
        dataIndex={col.dataIndex}
        options={col.filterOptions}
        placeholder={col.placeholder}
      />
    );
  } else if (col.filterType === "date") {
    return (props: any) => (
      <DateFilter
        {...props}
        handleSearch={handleSearch}
        handleReset={handleReset}
        dataIndex={col.dataIndex}
      />
    );
  } else {
    return (props: any) => (
      <DefaultFilter
        {...props}
        handleSearch={handleSearch}
        handleReset={handleReset}
        dataIndex={col.dataIndex}
        title={col.title}
      />
    );
  }
};

export const ReusableTable: React.FC<ReusableTableProps> = ({
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  showExport = false,
}) => {
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});

  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: string
  ) => {
    if (selectedKeys.length === 0) return;
    confirm();
    setFilters((prevFilters) => ({
      ...prevFilters,
      [dataIndex]: selectedKeys,
    }));
  };

  const handleReset = (clearFilters: () => void, dataIndex: string) => {
    clearFilters();
    setFilters((prevFilters) => {
      const { [dataIndex]: removedFilter, ...restFilters } = prevFilters;
      return restFilters;
    });
  };

  const getFilteredData = () => {
    return data.filter((item) =>
      Object.keys(filters).every((key) => {
        if (key === "items") {
          return filters[key].every((filter) =>
            item.items?.some((subItem: any) =>
              subItem.name.toLowerCase().includes(filter.toLowerCase())
            )
          );
        } else if (key === "transactionDate") {
          return filters[key].some((filter) =>
            moment(item[key]).isSame(moment(filter), "day")
          );
        } else {
          return filters[key].some((filter) =>
            item[key].toString().toLowerCase().includes(filter.toLowerCase())
          );
        }
      })
    );
  };

  const exportToExcel = async () => {
    const XLSX = await import("xlsx");
    const filteredData = getFilteredData();
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

    XLSX.writeFile(workbook, "data.xlsx");
  };

  const filteredColumns = columns.map((col) => ({
    ...col,
    filterDropdown: generateFilterDropdown(col, handleSearch, handleReset),
  }));

  if (onEdit && onDelete) {
    filteredColumns.push({
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button type="primary" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Button type="default" onClick={() => onDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    });
  }

  return (
    <div>
      <Space>
        {onAdd && (
          <Button type="primary" onClick={onAdd} style={{ marginBottom: 16 }}>
            Add Item
          </Button>
        )}

        {showExport && (
          <Button
            type="default"
            icon={<DownloadOutlined />}
            onClick={exportToExcel}
            style={{ marginBottom: 16 }}
          >
            Export to Excel
          </Button>
        )}
      </Space>
      <Table
        columns={filteredColumns}
        dataSource={getFilteredData()}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};
