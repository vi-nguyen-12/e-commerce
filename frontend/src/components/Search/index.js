import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import { Wrapper } from "./styled";
import { getProductList } from "../../slice/productSlice";
import { get } from "mongoose";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(getProductList(keyword));
    setKeyword("");
  };
  return (
    <Wrapper>
      <Form size="tiny">
        <Form.Input
          placeholder="Search Products..."
          value={keyword}
          onChange={(_, data) => setKeyword(data.value)}
        />
        <Form.Button onClick={handleSubmit} size="tiny">
          {" "}
          SEARCH
        </Form.Button>
      </Form>
    </Wrapper>
  );
};

export default Search;
