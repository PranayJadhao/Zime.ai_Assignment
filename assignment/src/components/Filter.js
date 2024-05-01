
import React, { useState } from "react";
import { Select } from "antd";

const { Option } = Select;

const Filter = ({ onChange }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleChange = (value) => {
    setSelectedFilters(value);
    onChange(value); 
  };

  return (
    <Select
      mode="multiple"
      allowClear
      style={{ width: "100%",margin:'auto' }}
      placeholder="Select tags"
      onChange={handleChange}
      value={selectedFilters}
    >
      <Option value="history">History</Option>
      <Option value="american">American</Option>
      <Option value="crime">Crime</Option>
      <Option value="french">French</Option>
      <Option value="fiction">Fiction</Option>
      <Option value="english">English</Option>
    </Select>
  );
};

export default Filter;
