import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Header, Form, Button, Radio } from "semantic-ui-react";
import { savePaymentMethod } from "../../slice/cartSlice";
import { Wrapper } from "./styled";
import { cartSelector } from "../../selector/cartSelector";
import CheckoutSteps from "../../components/CheckoutSteps";

const PaymentScreen = () => {
  const { shippingAddress } = useSelector(cartSelector);
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const history = useHistory();
  const dispatch = useDispatch();
  if (!shippingAddress) {
    history.push("/shipping");
  }
  const handleChange = (_, { value }) => {
    setPaymentMethod(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <Wrapper>
      <CheckoutSteps step1 step2 step3 />
      <Header as="h3"> PAYMENT METHOD</Header>
      <Form>
        <Form.Field>Select Method:</Form.Field>
        <Form.Field>
          <Radio
            label="PayPal or Credit Card"
            name="paymentMethod"
            value="Paypal"
            checked={paymentMethod === "PayPal"}
            onChange={handleChange}
          />
        </Form.Field>
        {/* <Form.Field>
          <Radio
            label="Stripe"
            name="paymentMethod"
            value="Stripe"
            checked={paymentMethod === "Stripe"}
            onChange={handleChange}
          />
        </Form.Field> */}
      </Form>
      <Button type="submit" onClick={handleSubmit}>
        CONTINUE
      </Button>
    </Wrapper>
  );
};

export default PaymentScreen;
