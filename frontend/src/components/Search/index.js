import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "semantic-ui-react";
import { Wrapper } from "./styled";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();
  const handleSubmit = () => {
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
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
