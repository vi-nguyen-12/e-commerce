import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { orderListSelector } from "../../selector/orderSelector";
import { userLoginSelector } from "../../selector/userSelector";
import { listOrders } from "../../slice/orderSlice";
import { Wrapper } from "./styled";
import { Message, Header, Button, Table, Container } from "semantic-ui-react";
import { ImCheckmark, ImCross } from "react-icons/im";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const { orders, error } = useSelector(orderListSelector);
  const { userInfo } = useSelector(userLoginSelector);

  const history = useHistory();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  if (error) return <Message negative content={error} />;
  return (
    <Wrapper>
      <Grid centered>
        <Grid.Column width={14}>
          <Container>
            <Header as="h3"> ORDERS</Header>
          </Container>
          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>USER</Table.HeaderCell>
                <Table.HeaderCell>DATE</Table.HeaderCell>
                <Table.HeaderCell>TOTAL</Table.HeaderCell>
                <Table.HeaderCell>PAID</Table.HeaderCell>
                <Table.HeaderCell>DELIVERED</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {orders.map((order, ind) => (
                <Table.Row key={ind}>
                  <Table.Cell>{order._id}</Table.Cell>
                  <Table.Cell>{order.user.name}</Table.Cell>
                  <Table.Cell>{order.createdAt}</Table.Cell>
                  <Table.Cell>{order.totalPrice}</Table.Cell>
                  <Table.Cell>
                    {order.isPaid ? (
                      <p>{order.paidAt.substring(0, 10)}</p>
                    ) : (
                      <ImCross color="red" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {order.isDelivered ? (
                      <ImCheckmark color="green" />
                    ) : (
                      <ImCross color="red" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      size="small"
                      onClick={() => {
                        history.push(`/order/${order._id}`);
                      }}
                    >
                      {" "}
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

export default OrderListScreen;
