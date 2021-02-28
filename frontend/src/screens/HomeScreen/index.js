import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Header, Grid, Message } from "semantic-ui-react";
import { Wrapper } from "./styled";
import { Product, Paginate } from "../../components";
import { productListSelector } from "../../selector/productSelector";
import { getProductList } from "../../slice/productSlice";

const HomeScreen = () => {
  const { products, error, page, pages } = useSelector(productListSelector);
  const dispatch = useDispatch();

  const { keyword, pageNumber } = useParams();

  useEffect(() => {
    console.log(pageNumber);
    dispatch(getProductList({ keyword, pageNumber }));
  }, [dispatch, keyword, pageNumber]);

  if (error) return <Message error header={error} />;
  return (
    <Wrapper>
      <Header> LATEST PRODUCTS </Header>
      <Grid columns={4}>
        <Grid.Row>
          {products.map((product, idx) => (
            <Grid.Column key={idx}>
              <Product product={product} />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
      <Paginate page={page} pages={pages} keyword={keyword} />
    </Wrapper>
  );
};

export default HomeScreen;
