import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .main {
    width: 350px;
  }
  .ui.header {
    font-weight: 350;
    margin: 15px 0;
  }
  .submit-btn {
    background-color: black;
    color: white;
  }
  .back-btn {
    background-color: transparent;
  }
`;
