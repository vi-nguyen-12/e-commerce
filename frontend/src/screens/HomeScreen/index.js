import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Header, Grid, Message } from "semantic-ui-react";
import { Wrapper } from "./styled";
import { Product, Paginate, ProductCarousel, Meta } from "../../components";
import { productListSelector } from "../../selector/productSelector";
import { getProductList } from "../../slice/productSlice";

const HomeScreen = () => {
  const { products, error, page, pages } = useSelector(productListSelector);
  const dispatch = useDispatch();

  const { keyword, pageNumber } = useParams();

  useEffect(() => {
    dispatch(getProductList({ keyword, pageNumber }));
  }, [dispatch, keyword, pageNumber]);

  if (error) return <Message error header={error} />;
  return (
    <Wrapper>
      <Meta />
      {!keyword && <ProductCarousel />}
      <Header> LATEST PRODUCTS </Header>
      <Grid columns={4}>
        <Grid.Row>
          {products.map((product, idx) => (
            <Grid.Column key={idx}>
              {/* <Link to={}> */}
              <Product product={product} />
              {/* </Link> */}
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
      <Paginate page={page} pages={pages} keyword={keyword} />
    </Wrapper>
  );
};

export default HomeScreen;
