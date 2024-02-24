import React from "react";
import { Input } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import useBookQuery from "../stores/useBookQuery";

const { Search } = Input;

const SearchBar: React.FC = () => {
  const setSearchText = useBookQuery((s) => s.setSearchText);
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    setSearchText(value);
  };
  return (
    <Search
      width="100%"
      placeholder="输入书名搜索"
      allowClear
      enterButton="搜索"
      size="large"
      onSearch={onSearch}
    />
  );
};

export default SearchBar;
