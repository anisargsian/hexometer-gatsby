import React, { useState } from 'react';
import { Form } from "tabler-react";
// import { ContentTextProps, SearchInputProps } from "../../types";

const SearchInput = (props) => {
  const { data, fields } = props;
  const [searchString, setSearchString] = useState("");

  const filterData = (searchText) => {
    let filteredData = [...data];
    let searchedString = searchText.trim().toLowerCase();
    for (let fieldName of fields) {
      filteredData = [...data];
      const name = fieldName.name;

      if (fieldName.concat) {
        const concat = fieldName.concat;
        filteredData = filteredData.filter((i) => `${i[name]} ${i[concat]}`.toLowerCase().includes(searchedString));
        filteredData = filteredData.sort((a, b) => (`${a[name]} ${a[concat]}`.toLowerCase().indexOf(searchedString) > `${b[name]} ${b[concat]}`.toLowerCase().indexOf(searchedString)) ? 1 : -1);
      } else {
        filteredData = filteredData.filter((i) => `${i[name]}`.toLowerCase().includes(searchedString));
        filteredData = filteredData.sort((a, b) => (`${a[name]}`.toLowerCase().indexOf(searchedString) > `${b[name]}`.toLowerCase().indexOf(searchedString)) ? 1 : -1);
      }
      if (filteredData.length > 0) break;
    }
    return filteredData;
  };

  return (
    <form onSubmit={(e ) => {
      e.preventDefault();
      props.onSubmit(filterData(searchString));
    }}>
      <Form.Group className="offset-9">
        <Form.Input
          icon="search"
          position="append"
          placeholder={props.placeholder}
          value={searchString}
          onChange={(e) => {
            const inputText = e.target.value;
            setSearchString(inputText);
          }}
        />
      </Form.Group>
    </form>
  )
};

export default SearchInput;
