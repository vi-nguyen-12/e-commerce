import styled from "styled-components";
import { Segment } from "semantic-ui-react";


export const Wrapper = styled(Segment)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .ui.header{
    width: 200px;
    font-family: "Sansita Swashed", cursive;
    color: var(--primary-color);
    font-size: 2rem;
    margin:auto 0;
    text-align:center;
    &:hover {
      cursor: pointer
    }
  }
  .ui.secondary.menu .item {
    &:hover{
      color:var(--primary-color);
      background-color:transparent;
      }
      }
  `
