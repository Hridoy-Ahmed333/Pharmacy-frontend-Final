import { useContext, useEffect, useState } from "react";

import ProductComponent from "./ProductComponent";
import { deleteMedicine, getMedicine } from "../api/medicineApi";
import styled from "styled-components";
import { SearchContext } from "../context/SearchContext";
import { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ProductComponetContainer = styled.div``;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const PageNumContainer = styled.div`
  height: 4rem;
  background-color: red;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center;
`;
// const PageNumber = styled.div`
//   background-color: blue;
//   margin: 0 auto;
// `;

function ProductWithPagination() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const { searchResults, search, categoryFilter, inStockFilter } =
    useContext(SearchContext);

  //console.log(searchResults.length);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchResults.length > 0) {
          setProducts(searchResults);
          setCurrentPage(1);
        } else if (search || categoryFilter || inStockFilter) {
          setProducts([]);
          setCurrentPage(1);
        } else {
          const response = await getMedicine();
          setProducts(response);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [searchResults, categoryFilter, search, inStockFilter]);

  function calcProduct() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products?.slice(
      startIndex,
      endIndex > products.length ? products.length : endIndex
    );
  }

  const newProduct = calcProduct();

  const handleDelete = async (productId) => {
    try {
      // Call the API to delete the product
      await deleteMedicine(productId);
      // Filter out the deleted product from the state
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  const totalPages = Math.ceil(products?.length / itemsPerPage);
  //console.log(currentPage);

  function moveNext() {
    if (currentPage >= totalPages) {
      setCurrentPage(1);
      return;
    }
    setCurrentPage(currentPage + 1);
  }
  function movePrev() {
    if (currentPage <= 1) {
      setCurrentPage(totalPages);
      return;
    }
    setCurrentPage(currentPage - 1);
  }

  //console.log(newProduct.length);

  return (
    <div>
      <Container>
        <ProductComponetContainer>
          <ProductComponent products={newProduct} onDelete={handleDelete} />
        </ProductComponetContainer>
        <PageNumContainer>
          <PaginationButton onClick={movePrev}>
            {" "}
            &lt;&lt; Previous Page
          </PaginationButton>
          {Array.from({ length: totalPages }).map((_, i) => (
            <PaginationButton key={i}>{i + 1}</PaginationButton>
          ))}
          <PaginationButton onClick={moveNext}>
            Next Page &gt;&gt;
          </PaginationButton>
        </PageNumContainer>
      </Container>
    </div>
  );
}

const PaginationButton = styled.button`
  background-color: #f0f0f0; /* Light grey background */
  color: #333; /* Dark text color */
  border: none;
  border-radius: 5px; /* Rounded corners */
  padding: 5px 10px; /* Padding inside the button */
  font-size: 14px; /* Font size */
  cursor: pointer; /* Cursor changes to pointer on hover */
  margin: 0 5px; /* Margin between buttons */
  animation: ${fadeIn} 0.3s ease; /* Apply fade-in animation */

  &:hover {
    background-color: #7b99e6; /* Change to a different color on hover */
    transition: background-color 0.3s ease; /* Smooth transition for background color */
  }
`;

export default ProductWithPagination;
