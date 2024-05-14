import React from "react";
import { Input } from "antd";
import type { SearchProps } from "antd/es/input/Search";

const { Search } = Input;
interface SearchBarProps {
  setSearchText: (value: string) => void;
  placeholder?: string;
}
const SearchBar: React.FC<SearchBarProps> = ({
  setSearchText,
  placeholder,
}) => {
  // Added <SearchBarProps> to specify the component's props type
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    setSearchText(value);
  };
  return (
    <Search
      width="100%"
      placeholder={placeholder}
      allowClear
      enterButton="搜索"
      size="large"
      onSearch={onSearch}
    />
  );
};

export default SearchBar;
