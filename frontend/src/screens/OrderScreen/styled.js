import styled from "styled-components";

export const Wrapper = styled.div`
  .ui.container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .ui.list > .item .header,
  .ui.header {
    line-height: 1.5rem;
    font-size: 1.1rem;
    font-weight: 350;
  }
  .ui.list > .item .header {
    padding: 1rem 0;
  }
  .info {
    width: 800px;
    padding-right: 20px;
  }
  .ui.menu .item {
    display: flex;
    justify-content: space-between;
  }
`;
