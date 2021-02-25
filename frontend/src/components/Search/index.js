import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { Wrapper } from "./styled";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const handleSubmit = () => {};
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
