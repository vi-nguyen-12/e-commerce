import React from "react";
import { Menu, Header, Dropdown } from "semantic-ui-react";
import Search from "../Search";
import { useDispatch, useSelector } from "react-redux";
import { Wrapper } from "./styled";
import { useHistory } from "react-router-dom";
import { userLoginSelector } from "../../selector/userSelector";
import { logout } from "../../slice/userSlice";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Heading = () => {
  const { userInfo } = useSelector(userLoginSelector);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleClick = (params) => () => {
    history.push(`/${params}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };
  return (
    <Wrapper>
      <Header onClick={handleClick("")}>PROSHOP</Header>
      <Search />
      <Menu secondary>
        <Menu.Item>{/* <Search /> */}</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item onClick={handleClick("cart")}>
            <AiOutlineShoppingCart />
          </Menu.Item>
          {userInfo ? (
            <Dropdown item text={userInfo.name.toUpperCase()}>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleClick("profile")}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Menu.Item name="SIGN IN" onClick={handleClick("login")} />
          )}
          {userInfo && userInfo.isAdmin && (
            <Dropdown item text="ADMIN">
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleClick("admin/userlist")}>
                  Users
                </Dropdown.Item>
                <Dropdown.Item onClick={handleClick("admin/productlist")}>
                  Products
                </Dropdown.Item>
                <Dropdown.Item onClick={handleClick("admin/orderlist")}>
                  Orders
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Menu>
      </Menu>
    </Wrapper>
  );
};

export default Heading;
