import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Message,
  Header,
  Form,
  Button,
  Grid,
  Container,
} from "semantic-ui-react";
import {
  getProductDetail,
  updateProduct,
  resetUpdate,
} from "../../slice/productSlice";
import { Wrapper } from "./styled";
import {
  productDetailSelector,
  productUpdateSelector,
} from "../../selector/productSelector";

const ProductEditScreen = () => {
  const dispatch = useDispatch();
  const { product, error } = useSelector(productDetailSelector);
  const { success: successUpdate, error: errorUpdate } = useSelector(
    productUpdateSelector
  );
  const [state, setState] = useState({
    name: "",
    price: "",
    image: false,
    brand: "",
    countInStock: 0,
    category: "",
    description: "",
    numReviews: 0,
  });

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (successUpdate) {
      dispatch(resetUpdate());
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== id) {
        dispatch(getProductDetail(id));
      } else {
        setState((state) => ({
          ...state,
          name: product.name,
          price: product.price,
          image: product.image,
          brand: product.brand,
          countInStock: product.countInStock,
          category: product.category,
          description: product.description,
          numReviews: product.numReviews,
        }));
      }
    }
  }, [dispatch, product, id, successUpdate, history]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ _id: id, ...state }));
  };

  return (
    <Wrapper>
      <Container>
        <Button
          className="back-btn"
          onClick={() => history.push("/admin/userlist")}
        >
          GO BACK
        </Button>
      </Container>
      <Grid.Column className="main">
        <Header as="h3"> EDIT PRODUCT</Header>
        {errorUpdate && <Message negative content={errorUpdate} />}
        {error && <Message negative content={error} />}
        <Form>
          <Form.Input
            label="Name"
            type="name"
            name="name"
            value={state.name}
            placeholder="Enter name"
            onChange={handleChange}
          />
          <Form.Input
            label="Price"
            type="price"
            name="price"
            value={state.price}
            placeholder="Enter price"
            onChange={handleChange}
          />
          <Form.Input
            label="Image"
            type="image"
            name="image"
            value={state.image}
            placeholder="Enter image"
            onChange={handleChange}
          />
          <Form.Input
            label="Brand"
            type="brand"
            name="brand"
            value={state.brand}
            placeholder="Enter brand"
            onChange={handleChange}
          />
          <Form.Input
            label="Count In Stock"
            type="countInStock"
            name="countInStock"
            value={state.countInStock}
            placeholder="Enter countInStock"
            onChange={handleChange}
          />
          <Form.Input
            label="Category"
            type="category"
            name="category"
            value={state.category}
            placeholder="Enter category"
            onChange={handleChange}
          />
          <Form.Input
            label="Description"
            type="description"
            name="description"
            value={state.description}
            placeholder="Enter description"
            onChange={handleChange}
          />
          <Form.Input
            label="Number of Reviews"
            type="numReviews"
            name="numReviews"
            value={state.numReviews}
            placeholder="Enter number of reviews"
            onChange={handleChange}
          />
          <Button className="submit-btn" type="submit" onClick={handleUpdate}>
            UPDATE
          </Button>
        </Form>
      </Grid.Column>
    </Wrapper>
  );
};

export default ProductEditScreen;
