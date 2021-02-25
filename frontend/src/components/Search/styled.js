import styled from "styled-components";

export const Wrapper = styled.div`
  width: 350px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  .ui.form {
    display: flex;
    align-items: center;
    & .field {
      margin: 0;
    }
  }
  .ui.button {
    margin-left: 5px;
    background-color: black;
    color: white;
    font-size: 0.85rem;
  }
`;
