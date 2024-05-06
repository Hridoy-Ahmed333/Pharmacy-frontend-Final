import { useContext, useState } from "react";
import styled from "styled-components";
import SingleProductContext from "../context/SingleProductContext";
import Ratings from "./Ratings";
import TotalRating from "./TotalRating";
import PriceComp from "./PriceComp";
import AddToCartComp from "./AddToCartComp";
import UserContext from "../context/UserContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; // Center horizontally
  align-items: center; // Center vertically
`;

const PictureContainer = styled.div`
  height: 30rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  width: 24rem;
  margin: 2rem auto;
  border-radius: 1rem;
  display: flex; // Use flexbox to center the image
  justify-content: center; // Center horizontally
  align-items: center; // Center vertically
  overflow: hidden; // Hide any part of the image that exceeds the container bounds
`;

const ProductImage = styled.img`
  object-fit: cover; // Ensure the image covers the entire area of the container
  width: 85%; // Set the width to  85% of the container
  height: 85%; // Set the height to  85% of the container
  max-width: 100%; // Prevent the image from overflowing the container
  max-height: 100%; // Prevent the image from overflowing the container
`;

const OutOfStock = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: red;
`;

const RatingContainer = styled.div`
  margin: 0 auto;
  margin-bottom: 2rem;
`;

function ProductCol2() {
  const [totalPrice, setTotalPrice] = useState(1);
  const { product } = useContext(SingleProductContext);
  const productImage = product?.image;
  const { user } = useContext(UserContext);
  const isAdmin = user?.role === "admin";

  return (
    <Container>
      <PictureContainer>
        {productImage && (
          <ProductImage
            src={`http://localhost:8080/images/${productImage}`}
            alt="Product"
          />
        )}
      </PictureContainer>

      <RatingContainer>
        <TotalRating />
        <Ratings />
      </RatingContainer>

      <PriceComp
        product={product}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
      />
      {isAdmin ? (
        <OutOfStock>Admin cannoy add product to the cart</OutOfStock>
      ) : (
        <>
          {product?.stock > 0 ? (
            <AddToCartComp
              product={product}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
            />
          ) : (
            <OutOfStock>This product is out of stock</OutOfStock>
          )}
        </>
      )}
    </Container>
  );
}

export default ProductCol2;
