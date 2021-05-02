import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import {
  productListSelector,
  productDeleteSelector,
  productCreateSelector,
} from "../../selector/productSelector";
import { userLoginSelector } from "../../selector/userSelector";
import {
  getProductList,
  deleteProduct,
  resetDelete,
  createProduct,
  resetCreate,
} from "../../slice/productSlice";
import { Wrapper } from "./styled";
import { Message, Header, Button, Table, Container } from "semantic-ui-react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector(productListSelector);
  const { userInfo } = useSelector(userLoginSelector);
  const { success: successDelete, error: errorDelete } = useSelector(
    productDeleteSelector
  );
  const { success: successCreate, error: errorCreate } = useSelector(
    productCreateSelector
  );

  const history = useHistory();
  useEffect(() => {
    if (successDelete) {
      dispatch(resetDelete());
    }
    if (successCreate) {
      dispatch(resetCreate());
    }
    if (userInfo && userInfo.isAdmin) {
      dispatch(getProductList({ pageNumber: "all" }));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete, successCreate]);

  const handleDelete = (id) => () => {
    if (window.confirm("Are you sure? ")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleCreate = () => {
    dispatch(createProduct());
  };

  if (errorDelete) return <Message negative content={errorDelete} />;
  if (errorCreate) return <Message negative content={errorCreate} />;
  if (error) return <Message negative content={error} />;
  return (
    <Wrapper>
      <Grid centered>
        <Grid.Column width={14}>
          <Container>
            <Header as="h3"> PRODUCTS</Header>
            <Button className="create-btn" size="tiny" onClick={handleCreate}>
              <AiOutlinePlus /> CREATE PRODUCT{" "}
            </Button>
          </Container>

          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>NAME</Table.HeaderCell>
                <Table.HeaderCell>PRICE</Table.HeaderCell>
                <Table.HeaderCell>CATEGORY</Table.HeaderCell>
                <Table.HeaderCell>BRAND</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {products.map((product, ind) => (
                <Table.Row key={ind}>
                  <Table.Cell>{product._id}</Table.Cell>
                  <Table.Cell>{product.name}</Table.Cell>
                  <Table.Cell>{product.price}</Table.Cell>
                  <Table.Cell>{product.category}</Table.Cell>
                  <Table.Cell>{product.brand}</Table.Cell>
                  <Table.Cell>
                    <Button
                      size="small"
                      onClick={() => {
                        history.push(`/admin/product/${product._id}/edit`);
                      }}
                    >
                      {" "}
                      <FiEdit />
                    </Button>
                    <Button size="small" onClick={handleDelete(product._id)}>
                      {" "}
                      <RiDeleteBin6Line color="red" />
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

export default ProductListScreen;
