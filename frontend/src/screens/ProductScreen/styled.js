import styled from "styled-components";


export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    &>*{
        width: 900px
    }
    .ui.button {
        margin-left:1rem;
        background-color:transparent;

    }
    .item a.header {
        display:block;
        padding: 5px 0;
        line-height: 1.5rem;
        font-size: 1.1rem;
    }
    .ui.menu .item {
        display: flex;
        justify-content: space-between;

        & .ui.button {
        background-color: black;
        color:white;

        & .field{
        display:flex;
        width:100%;
            & .ui.selection.dropdown {
                display:block;
                background-color:red
        }
    }
    }
    }
   
   
`
