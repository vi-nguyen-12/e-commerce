import React, { useEffect } from "react";
import { CheckoutSteps } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Grid,
  List,
  Header,
  Container,
  Image,
  Menu,
  Button,
  Message,
} from "semantic-ui-react";
import { Wrapper } from "./styled";
import { cartSelector } from "../../selector/cartSelector";
import { orderCreateSelector } from "../../selector/orderSelector";
import { createOrder } from "../../slice/orderSlice";

const PlaceOrderScreen = () => {
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    cartSelector
  );
  const { order, success, error } = useSelector(orderCreateSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const itemsPrice = cartItems.reduce(
    (total, i) => (total += i.price * i.qty),
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 100;
  const taxPrice = itemsPrice * 0.15;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  const addDecimal = (number) => {
    return (Math.round(number * 100) / 100).toFixed(2);
  };

  useEffect(() => {
    if (success) {
      history.push(`order/${order._id}`);
    }
  }, [history, success]);
  const handlePlaceOrder = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };

  return (
    <Wrapper>
      <CheckoutSteps step1 step2 step3 step4 />
      <Container>
        <List divided relaxed className="info">
          <List.Item>
            <Header>SHIPPING</Header>
            <p>
              Address: {shippingAddress.address} {shippingAddress.city}{" "}
              {shippingAddress.postalCode} {shippingAddress.country}
            </p>
          </List.Item>
          <List.Item>
            <Header>PAYMENT METHOD</Header>
            <p>Method: {paymentMethod}</p>
          </List.Item>
          <List.Item>
            <Header>ORDER ITEMS</Header>
            {cartItems.length === 0 ? (
              <Message content="Your Cart is Empty" />
            ) : (
              <Container>
                <List divided relaxed>
                  {cartItems.map((item) => (
                    <List.Item>
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
            <div>{addDecimal(itemsPrice)}</div>
          </Menu.Item>
          <Menu.Item>
            <div>Shipping </div>
            <div>{addDecimal(shippingPrice)}</div>
          </Menu.Item>
          <Menu.Item>
            <div>Tax </div>
            <div>{addDecimal(taxPrice)}</div>
          </Menu.Item>
          <Menu.Item>
            <div>Total </div>
            <div>{addDecimal(totalPrice)}</div>
          </Menu.Item>
          <Menu.Item>{error && <Message negative content={error} />}</Menu.Item>
          <Menu.Item>
            <Button onClick={handlePlaceOrder}>PLACE ORDER</Button>
          </Menu.Item>
        </Menu>
      </Container>
    </Wrapper>
  );
};

export default PlaceOrderScreen;
