import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  Grid,
  List,
  Header,
  Container,
  Image,
  Menu,
  Message,
} from "semantic-ui-react";
import { Loading } from "../../components";
import { Wrapper } from "./styled";
import {
  orderDetailsSelector,
  orderPaySelector,
} from "../../selector/orderSelector";
import {
  getOrderDetails,
  resetPayOrder,
  payOrder,
} from "../../slice/orderSlice";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";

const OrderScreen = () => {
  const { loading, order, error } = useSelector(orderDetailsSelector);
  const { loading: loadingPay, success: successPay } = useSelector(
    orderPaySelector
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [sdkReady, setSdkReady] = useState(false);

  const addDecimal = (number) => {
    return (Math.round(number * 100) / 100).toFixed(2);
  };

  const handleSuccessPayment = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder({ id, paymentResult }));
  };

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = setSdkReady(true);
      document.body.appendChild(script);
    };
    if (!order || successPay || order._id !== id) {
      // dispatch(resetPayOrder());
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
    console.log("test");
  }, [dispatch, order, id, successPay]);

  if (loading) return <Loading />;
  if (error) return <Message error header={error} />;
  return (
    <Wrapper>
      <Container>
        <Header> ORDER: {order._id}</Header>
      </Container>
      <Container>
        <List divided relaxed className="info">
          <List.Item>
            <Header>SHIPPING</Header>
            <p>Name: {order.user.name}</p>
            <p>
              Email:{" "}
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p>
              Address: {order.shippingAddress.address}{" "}
              {order.shippingAddress.city} {order.shippingAddress.postalCode}{" "}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message
                positive
                content={`Order delivered at ${order.deliveredAt}`}
              />
            ) : (
              <Message negative content="Not Delivered" />
            )}
          </List.Item>
          <List.Item>
            <Header>PAYMENT METHOD</Header>
            <p>Method: {order.paymentMethod}</p>
            {order.paidAt ? (
              <Message positive content={`Order paid at ${order.paidAt}`} />
            ) : (
              <Message negative content="Not Paid" />
            )}
          </List.Item>
          <List.Item>
            <Header>ORDER ITEMS</Header>
            {order.orderItems.length === 0 ? (
              <Message content="Your Cart is Empty" />
            ) : (
              <Container>
                <List divided relaxed>
                  {order.orderItems.map((item, id) => (
                    <List.Item key={id}>
                      <Grid columns={3}>
                        <Grid.Column width={3}>
                          <Image src={item.image} rounded />
                        </Grid.Column>
                        <Grid.Column width={8}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Grid.Column>
                        <Grid.Column width={5}>
                          {item.qty} x ${item.price} = {item.qty * item.price}
                        </Grid.Column>
                      </Grid>
                    </List.Item>
                  ))}
                </List>
              </Container>
            )}
          </List.Item>
        </List>

        <Menu vertical>
          <Menu.Item>
            <Header>ORDER SUMMARY</Header>
          </Menu.Item>
          <Menu.Item>
            <div>Items </div>
            <div>{addDecimal(order.itemsPrice)}</div>
          </Menu.Item>
          <Menu.Item>
            <div>Shipping </div>
            <div>{addDecimal(order.shippingPrice)}</div>
          </Menu.Item>
          <Menu.Item>
            <div>Tax </div>
            <div>{addDecimal(order.taxPrice)}</div>
          </Menu.Item>
          <Menu.Item>
            <div>Total </div>
            <div>{addDecimal(order.totalPrice)}</div>
          </Menu.Item>
          {error && <Message negative content={error} />}
          {!order.isPaid && (
            <>
              {loadingPay && <Loading />}
              {!sdkReady ? (
                <Loading />
              ) : (
                <PayPalButton
                  amount={addDecimal(order.totalPrice)}
                  onSuccess={handleSuccessPayment}
                />
              )}
            </>
          )}
        </Menu>
      </Container>
    </Wrapper>
  );
};

export default OrderScreen;
