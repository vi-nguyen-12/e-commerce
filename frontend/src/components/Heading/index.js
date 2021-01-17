import React from 'react'
import { Menu, Header,Dropdown } from "semantic-ui-react";
import {useDispatch,useSelector} from 'react-redux';
import { Wrapper} from "./styled";
import { useHistory } from "react-router-dom";
import {userLoginSelector} from '../../selector/userSelector'
import {logout} from '../../slice/userSlice'

const Heading = () => {
    const {userInfo}=useSelector(userLoginSelector);
    const dispatch=useDispatch();

    const history= useHistory();

    const handleClick=(params)=>()=>{
      history.push(`/${params}`)}

    const handleLogout=()=>{
        dispatch(logout());
    }
    return (
        <Wrapper>
            <Header onClick={handleClick('')}>PROSHOP</Header>
            <Menu secondary >
                <Menu.Item>
                    {/* <Search /> */}
                </Menu.Item>
                <Menu.Menu position="right">
                <Menu.Item name="CART" onClick={handleClick('cart')}/>
                {userInfo?(
                    <Dropdown item text={userInfo.name}>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleClick('profile')}>Profile</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ): (
                    <Menu.Item name="SIGN IN" onClick={handleClick('login')}/>
                )}       
                </Menu.Menu>
            </Menu>
        </Wrapper>
    )
}

export default Heading
