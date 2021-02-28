import React from "react";
import { Pagination } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { Wrapper } from "./styled";

const Paginate = ({ pages, page, keyword }) => {
  const history = useHistory();
  const handleChange = (_, data) => {
    if (keyword) {
      history.push(`/search/${keyword}/page/${data.activePage}`);
    } else {
      history.push(`/page/${data.activePage}`);
    }
  };
  return (
    <Wrapper>
      <Pagination
        activePage={page}
        totalPages={pages}
        boundaryRange={0}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        onPageChange={handleChange}
      />
    </Wrapper>
  );
};

export default Paginate;
