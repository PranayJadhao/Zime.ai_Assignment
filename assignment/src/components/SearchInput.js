
import React, { useState, useRef } from "react";
import { Input } from "antd";

const { Search } = Input;

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const handleSearch = (value) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <Search
      placeholder="Search posts"
      allowClear
      enterButton="Search"
      onSearch={handleSearch}
      value={query}
      ref={inputRef} 
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};

export default SearchInput;
