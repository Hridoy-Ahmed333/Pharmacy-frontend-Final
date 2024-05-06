import { useContext, useEffect, useState } from "react";

import ProductComponent from "./ProductComponent";
import { deleteMedicine, getMedicine } from "../api/medicineApi";
import styled from "styled-components";
import { SearchContext } from "../context/SearchContext";

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
          <button onClick={movePrev}> &lt;&lt; Previous Page</button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i}>{i + 1}</button>
          ))}
          <button onClick={moveNext}>Next Page &gt;&gt;</button>
        </PageNumContainer>
      </Container>
    </div>
  );
}

export default ProductWithPagination;
