import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center; /* This centers the children vertically */
  justify-content: center; /* This centers the children horizontally */
  gap: 1rem;
`;
const Span = styled.span`
  text-decoration: line-through;
  margin-right: 1rem;
  font-size: 2rem;
  font-weight: 700;
  color: red;
`;
const Span2 = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: green;
`;
const Discount = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: red;
  background-color: gold;
  border-radius: 50%;
  padding: 1rem;
`;
const Money = styled.span`
  font-size: 2rem;
  font-weight: 800;
`;

function PriceComp({ product, totalPrice, setTotalPrice }) {
  return <Price product={product} totalPrice={totalPrice} />;
}

function Price({ product, totalPrice }) {
  const price2 =
    totalPrice > 1 ? (product?.price * totalPrice).toFixed(2) : product?.price;
  const price =
    totalPrice > 1
      ? (
          product?.price * totalPrice -
          ((product?.price * totalPrice) / 100) * product?.discountPercentage
        ).toFixed(2)
      : product?.price - (product?.price / 100) * product?.discountPercentage;

  return (
    <Container>
      {product?.discountPercentage > 0 ? (
        <>
          <Discount>{product?.discountPercentage}% OFF</Discount>
          <div>
            <Span>
              {price2}
              <Money>৳</Money>
            </Span>
            <Span2>
              {price}
              <Money>৳</Money>
            </Span2>
          </div>
        </>
      ) : (
        <Span2>
          {price2}
          <Money>৳</Money>
        </Span2>
      )}
    </Container>
  );
}

export default PriceComp;
