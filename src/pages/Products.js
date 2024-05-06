import styled from "styled-components";
import Category from "../Components/Category";

import { useContext, useEffect, useState } from "react";
import { getCategories } from "../api/categoryApi";
//import ProductComponent from "../Components/ProductComponent";
import ProductWithPagination from "../Components/ProductWithPagination";
import { SearchContext } from "../context/SearchContext";
import { searchByStock, searchMedicine } from "../api/medicineApi";
import UserContext from "../context/UserContext";

const Container = styled.div`
  margin-top: 3rem;
  display: flex;
  min-height: 80vh; // Ensure the container takes at least the full viewport height
  height: 100%; // Take up any remaining space if the content is less than the viewport height
  gap: 2rem; // Adjust the gap between columns as needed
`;

const Column1 = styled.div`
  flex: 2;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  background-color: #f0f0f0; // Example background color for visibility
  padding: 1rem; // Add some padding for content
  justify-content: flex-start; // Align items to the start of the column
  align-self: flex-start; // Aligns the item itself at the start of the cross axis
`;

const Column2 = styled.div`
  flex: 8;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  background-color: #f0f0f0; // Example background color for visibility
  padding: 1rem; // Add some padding for content
  min-height: calc(
    80vh - 2rem
  ); // Subtract the total gap to account for the gap between columns
`;

const RowContainer = styled.div`
  margin-top: 2.5rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
`;

const CategoryButton = styled.button`
  background-color: rgb(0, 128, 0); // Button color
  color: white; // Text color
  border: none; // Remove default button border
  cursor: pointer; // Change cursor to pointer on hover
  border-radius: 5%; // Make the button round
  padding-top: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.8);
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 0 auto; // Space between the search box and the button// Use flex to center the icon inside the button
  align-items: center; // Vertically center the icon
  justify-content: center; // Horizontally center the icon
  // Smooth transition for color change
  height: 2.5rem;
  width: 55%;
  transition: background-color 0.3s ease, height 0.3s ease, width 0.2s ease,
    font-weight 0.4s ease;
  &:hover {
    // Darken the button color on hover
    box-shadow: 0 10px 12px rgba(0, 0, 0, 0.4);
    font-size: 15px;
    height: 3rem;
    width: 70%;
    font-weight: bold;
    transition: background-color 0.3s ease, height 0.3s ease, width 0.2s ease,
      font-weight 0.4s ease;
  }
`;

const Cnt = styled.div`
  margin-top: 2.5rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
`;

const FilterButton = styled.button`
  background-color: rgb(0, 128, 0); // Button color
  color: white; // Text color
  border: none; // Remove default button border
  cursor: pointer; // Change cursor to pointer on hover
  border-radius: 5%; // Make the button round
  padding-top: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.8);
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 0 auto; // Space between the search box and the button// Use flex to center the icon inside the button
  align-items: center; // Vertically center the icon
  justify-content: center; // Horizontally center the icon
  // Smooth transition for color change
  height: 2.5rem;
  font-weight: normal;
  width: 55%;
  transition: background-color 0.3s ease, height 0.3s ease, width 0.3s ease,
    font-weight 0.6s ease, font-size 0.6s ease;
  &:hover {
    // Darken the button color on hover
    box-shadow: 0 10px 12px rgba(0, 0, 0, 0.4);
    font-size: 15px;
    height: 3.5rem;
    width: 70%;
    transition: background-color 0.3s ease, height 0.3s ease, width 0.2s ease,
      font-weight 0.4s ease;
  }
`;

const FilterCloseButton = styled.button`
  background-color: #ff0000; // Button color
  color: white; // Text color
  border: none; // Remove default button border
  cursor: pointer; // Change cursor to pointer on hover
  border-radius: 5%; // Make the button round
  padding-top: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.8);
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  font-weight: normal;
  margin: 0 auto; // Space between the search box and the button// Use flex to center the icon inside the button
  align-items: center; // Vertically center the icon
  justify-content: center; // Horizontally center the icon
  // Smooth transition for color change
  height: 3rem;
  width: 55%;
  transition: background-color 0.3s ease, height 0.3s ease, width 0.3s ease,
    font-weight 0.6s ease, font-size 0.6s ease;
  &:hover {
    // Darken the button color on hover
    box-shadow: 0 10px 12px rgba(0, 0, 0, 0.4);
    font-size: 15px;
    font-weight: bold;
    height: 3.5rem;
    width: 70%;
    transition: background-color 0.3s ease, height 0.3s ease, width 0.2s ease,
      font-weight 0.4s ease;
  }
`;

function Products() {
  const [showCat, setShowCat] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const {
    searchResults,
    search: searchText,
    categoryFilter,
    inStockFilter,
    applyStockFilter,
    applySearchResults,
  } = useContext(SearchContext);

  function handleClick(e) {
    e.preventDefault();
    setShowCat(!showCat);
  }

  useEffect(() => {
    // This effect runs whenever searchResults changes
    // console.log("Updated search results:", searchResults);
    // console.log("The search text is:", searchText);
    // console.log("The Category is:", categoryFilter);
    // console.log("The Stock is:", inStockFilter);
  }, [searchResults, searchText, categoryFilter, inStockFilter]);

  async function handleFilter(tempFilter) {
    const res = await searchByStock({
      inStockFilter: tempFilter ? tempFilter : false,
    });
    applySearchResults(res);
    applyStockFilter(tempFilter);

    console.log("In the Filter the response is:", res);
  }

  async function handleFilterClick(e) {
    e.preventDefault();
    const tempFilter = !isFilter;
    setIsFilter(!isFilter);
    await handleFilter(tempFilter);
  }
  const { user } = useContext(UserContext);

  const isAdmin = user?.role === "admin";

  return (
    <Container>
      <Column1 width={3}>
        <CategoryButton onClick={handleClick}>
          {!showCat ? "Show Category List" : "Cloase The Tab"}
        </CategoryButton>
        {showCat && <CategoryList />}
        {isAdmin && (
          <Cnt>
            {!isFilter ? (
              <FilterCloseButton onClick={handleFilterClick}>
                Filter the Out of Stock Product
              </FilterCloseButton>
            ) : (
              <FilterButton onClick={handleFilterClick}>
                All Product
              </FilterButton>
            )}
          </Cnt>
        )}
      </Column1>
      <Column2 width={7}>
        <ProductWithPagination />
      </Column2>
    </Container>
  );
}

// CategoryList.js
// Adjust the import path based on where your API function is located

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array means this effect runs once on mount

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <RowContainer>
      {categories.map((category) => (
        <Category key={category._id} category={category} />
      ))}
    </RowContainer>
  );
}

export default Products;
