import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { userDetailsSelector } from "../../selector/userSelector";
import {
  userLoginSelector,
  userUpdateProfileSelector,
} from "../../selector/userSelector";
import { myOrderListSelector } from "../../selector/orderSelector";
import { getUserDetails, updateUserProfile } from "../../slice/userSlice";
import { listMyOrders } from "../../slice/orderSlice";
import { Wrapper } from "./styled";
import { Message, Header, Form, Button, Table } from "semantic-ui-react";
import { ImCross } from "react-icons/im";
const ProfileScreen = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { user, error } = useSelector(userDetailsSelector);
  const { userInfo } = useSelector(userLoginSelector);
  const { success } = useSelector(userUpdateProfileSelector);
  const { orders, loading: loadingOrders, error: errorOrders } = useSelector(
    myOrderListSelector
  );
  const addDecimal = (number) => {
    return (Math.round(number * 100) / 100).toFixed(2);
  };
  const history = useHistory();
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (
        !user.name ||
        user.name !== userInfo.name ||
        user.email !== userInfo.email
      ) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setState({
          ...state,
          name: user.name,
          email: user.email,
        });
      }
    }
  }, [dispatch, history, userInfo, user, message, error, success]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    if (state.password !== state.confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: state.name,
          email: state.email,
          password: state.password,
        })
      );
    }
  };
  return (
    <Wrapper>
      <Grid columns={2} centered>
        <Grid.Column width={4} className="five-wide">
          <Header as="h3"> MY PROFILE</Header>
          {message && <Message negative content={message} />}
          {error && <Message negative content={error} />}
          {success && <Message positive content="Profile updated" />}
          <Form>
            <Form.Input
              label="Name"
              type="name"
              name="name"
              id="form-input-name"
              value={state.name}
              placeholder="Enter name"
              onChange={handleChange}
            />
            <Form.Input
              label="Email Address"
              type="email"
              name="email"
              id="form-input-email"
              value={state.email}
              placeholder="Enter email"
              onChange={handleChange}
            />
            <Form.Input
              label="Password"
              type="password"
              name="password"
              id="form-input-password"
              value={state.password}
              placeholder="Enter password"
              onChange={handleChange}
            />
            <Form.Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              id="form-input-confirmPassword"
              value={state.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            <Button type="submit" onClick={handleSubmit}>
              UPDATE
            </Button>
          </Form>
        </Grid.Column>
        <Grid.Column width={11}>
          <Header as="h3"> MY ORDERS</Header>
          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={5}>ID</Table.HeaderCell>
                <Table.HeaderCell width={3}>DATE</Table.HeaderCell>
                <Table.HeaderCell width={2}>TOTAL</Table.HeaderCell>
                <Table.HeaderCell width={3}>PAID</Table.HeaderCell>
                <Table.HeaderCell width={3}>DELIVERED</Table.HeaderCell>
                <Table.HeaderCell width={1}></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {orders.map((order, ind) => (
                <Table.Row key={ind}>
                  <Table.Cell>{order._id}</Table.Cell>
                  <Table.Cell>{order.createdAt.substring(0, 10)}</Table.Cell>
                  <Table.Cell>{addDecimal(order.totalPrice)}</Table.Cell>
                  <Table.Cell>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <ImCross color="red" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <ImCross color="red" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      size="mini"
                      compact
                      onClick={() => {
                        history.push(`/order/${order._id}`);
                      }}
                    >
                      DETAILS
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    </Wrapper>
  );
};

export default ProfileScreen;
