import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { topProductsSelector } from "../../selector/productSelector";
import { getTopProducts } from "../../slice/productSlice";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Wrapper } from "./styled";

const ProductCarousel = () => {
  const { products } = useSelector(topProductsSelector);
  console.log(products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);
  return (
    <Wrapper>
      <Carousel showArrows showIndicators>
        {products.map((p) => (
          <div>
            <img src={p.image} alt={p.name} />
            <h4>
              {p.name} (${p.price})
            </h4>
          </div>
        ))}
      </Carousel>
    </Wrapper>
  );
};

export default ProductCarousel;
