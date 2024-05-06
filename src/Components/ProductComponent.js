import ProductCard from "./ProductCard";
import styled from "styled-components";

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Creates  3 columns */
  grid-template-rows: repeat(3, auto);
  gap: 10px; /* Adjust the gap between cards as needed */
`;

const ProductContainer = styled.div`
  min-height: 340px;
`;

function ProductComponent({ products, onDelete }) {
  return (
    <ProductGrid>
      {products?.map((product) => (
        <ProductContainer key={product._id}>
          <ProductCard
            key={product._id}
            product={product}
            onDelete={onDelete}
          />
        </ProductContainer>
      ))}
    </ProductGrid>
  );
}

export default ProductComponent;
