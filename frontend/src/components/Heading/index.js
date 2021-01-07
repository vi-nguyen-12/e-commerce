import React from 'react'
import { Menu, Header } from "semantic-ui-react";
import { Wrapper} from "./styled";
import { useHistory } from "react-router-dom";

const Heading = () => {

    const history= useHistory();

    const handleClick=(params)=>()=>{
      history.push(`/${params}`)}

    return (
        <Wrapper>
            <Header onClick={handleClick('')}>PROSHOP</Header>
            <Menu secondary >
                <Menu.Item>
                    {/* <Search /> */}
                </Menu.Item>
                <Menu.Menu position="right">
                <Menu.Item name="CART" onClick={handleClick('cart')}/>
                <Menu.Item name="SIGN IN" onClick={handleClick('login')}/>
                </Menu.Menu>
            </Menu>
        </Wrapper>
    )
}

export default Heading
