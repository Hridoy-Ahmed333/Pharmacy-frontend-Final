import { useContext } from "react";
import SingleProductContext from "../context/SingleProductContext";
import styled from "styled-components";
import ProductCol1 from "./ProductCol1";
import ProductCol2 from "./ProductCol2";
const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const Col1 = styled.div`
  width: 60%;
  background-color: #f0f0f0;
`;
const Col2 = styled.div`
  width: 40%;
  background-color: #f0f0f0;
`;

function ProductDetailsWhole() {
  const { product } = useContext(SingleProductContext);
  return (
    <ProductContainer>
      <Col1>
        <ProductCol1 />
      </Col1>
      <Col2>
        <ProductCol2 />
      </Col2>
    </ProductContainer>
  );
}

export default ProductDetailsWhole;
