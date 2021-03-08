import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  getProductDetail,
  createProductReview,
  resetReviewCreate,
} from "../../slice/productSlice";
import {
  productDetailSelector,
  productReviewCreateSelector,
} from "../../selector/productSelector";

import { userLoginSelector } from "../../selector/userSelector";
import {
  Button,
  Item,
  Menu,
  Divider,
  Grid,
  Image,
  Message,
  Dropdown,
  Header,
  Form,
  Select,
  TextArea,
} from "semantic-ui-react";
// import {Loading} from '../../components'
import { Meta } from "../../components";
import { Wrapper } from "./styled";
import Rating from "../../components/Rating";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const history = useHistory();
  const { product, error } = useSelector(productDetailSelector);
  const {
    success: createReviewSuccess,
    error: createReviewError,
  } = useSelector(productReviewCreateSelector);

  const { userInfo } = useSelector(userLoginSelector);

  const dispatch = useDispatch();

  const options = [...Array(product.countInStock).keys()].map((x) => {
    return { key: x + 1, text: x + 1, value: x + 1 };
  });

  const ratingOptions = [
    { key: 0, value: "", text: "Select..." },
    { key: 1, value: "1", text: "1-- Poor" },
    { key: 2, value: "2", text: "2-- Fair" },
    { key: 3, value: "3", text: "3-- Good" },
    { key: 4, value: "4", text: "4-- Very Good" },
    { key: 5, value: "5", text: "5-- Excellent" },
  ];

  useEffect(() => {
    if (product._id && product._id !== id) {
      dispatch(resetReviewCreate());
    }
    dispatch(getProductDetail(id));
  }, [dispatch, id, createReviewSuccess, createReviewError]);

  const handleClick = () => {
    history.push("/");
  };

  const handleAddToCart = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  const handleSubmit = () => {
    dispatch(createProductReview({ id, rating, comment }));
    setRating("");
    setComment("");
  };

  if (error) return <Message error header={error} />;

  return (
    <Wrapper>
      <Meta title={product.name} />
      <Grid columns={4}>
        <Grid.Row>
          <Button onClick={handleClick}>GO BACK</Button>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Image src={product.image} />
          </Grid.Column>
          <Grid.Column width={4}>
            <Item>
              <Item.Header as="a">{product.name}</Item.Header>
              <Divider />
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
              <Divider />
              <Item.Description>Price: ${product.price}</Item.Description>
              <Divider />
              <Item.Description>
                Description: {product.description}
              </Item.Description>
            </Item>
          </Grid.Column>
          <Grid.Column width={4}>
            <Menu vertical>
              <Menu.Item>
                <div>Price: </div>
                <div>{product.price}</div>
              </Menu.Item>
              <Menu.Item>
                <div>Status: </div>
                <div>
                  {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                </div>
              </Menu.Item>
              {product.countInStock > 0 && (
                <Menu.Item>
                  <div>Qty</div>
                  <Dropdown
                    options={options}
                    onChange={(_, data) => {
                      setQty(data.value);
                    }}
                    value={qty}
                  />
                </Menu.Item>
              )}
              <Menu.Item>
                <Button
                  disabled={product.countInStock === 0}
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </Button>
              </Menu.Item>
            </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid>
        <Grid.Row>
          <Header>REVIEWS</Header>
        </Grid.Row>
        <Grid.Row>
          {product.reviews?.length === 0 ? (
            <Message info content="No Reviews" />
          ) : (
            product.reviews?.map((r) => (
              <Item>
                <Item.Description>{r.name}</Item.Description>
                <Rating value={r.rating} />
                <Item.Description>{r.comment}</Item.Description>
              </Item>
            ))
          )}
        </Grid.Row>
        <Divider />
        {userInfo && (
          <>
            <Grid.Row>
              <Header>WRITE A CUSTOMER REVIEW</Header>
            </Grid.Row>
            {createReviewError && (
              <Message negative content={createReviewError} />
            )}
            {createReviewSuccess && (
              <Message positive content="Review submitted!!" />
            )}
            <Grid.Row>
              <Form>
                <Form.Field
                  control={Select}
                  label="Rating"
                  value={rating}
                  placeholder="Select"
                  options={ratingOptions}
                  onChange={(_, data) => {
                    setRating(data.value);
                  }}
                />

                <Form.Field
                  control={TextArea}
                  label="Comment"
                  value={comment}
                  onInput={(_, data) => {
                    setComment(data.value);
                  }}
                />
                <Button type="submit" onClick={handleSubmit}>
                  SUBMIT
                </Button>
              </Form>
            </Grid.Row>
          </>
        )}
      </Grid>
    </Wrapper>
  );
};

export default ProductScreen;
