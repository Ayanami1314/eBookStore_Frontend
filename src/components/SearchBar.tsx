import React from "react";
import { Input, Select } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { DefaultOptionType } from "antd/es/select";

const { Search } = Input;
const { Option } = Select;
interface Selector {
  selections: string[];
  onChange: (value: string) => void;
  defaultValue: string;
  completeOptions?: DefaultOptionType[];
}
interface SearchBarProps {
  setSearchText: (value: string) => void;
  placeholder?: string;
  selector?: Selector;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setSearchText,
  placeholder,
  selector,
}) => {
  // Added <SearchBarProps> to specify the component's props type
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    setSearchText(value);
  };
  const selectBefore = selector && (
    <Select defaultValue={selector.defaultValue} onChange={selector.onChange}>
      {selector.selections.map((selection, index) => (
        <Option key={index} value={selection}>
          {selection}
        </Option>
      ))}
    </Select>
  );

  return (
    <Search
      addonBefore={selectBefore}
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
export type { Selector, SearchBarProps };
