import styled from "styled-components";
import { searchByCategory, searchMedicine } from "../api/medicineApi";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/SearchContext";
const Row1 = styled.div`
  height: 2.5rem; // This sets the height of the row
  background-color: rgb(100, 200, 0);
  color: darkblue;
  font-size: 1.4rem;
  padding-top: 0.3rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.8);
  padding-bottom: 0.3rem;
  border-radius: 5%;
  font-weight: 600;
  width: 85%;
  cursor: pointer;
  margin: 0 auto;
  display: flex; // This makes the div a flex container if needed
  align-items: center; // This centers the content vertically if needed
  justify-content: center; // This centers the content horizontally if needed
  transition: background-color 0.3s ease, height 0.3s ease, width 0.2s ease,
    font-size 0.6s ease;
  &:hover {
    background-color: rgb(173, 255, 47);
    box-shadow: 0 10px 12px rgba(0, 0, 0, 0.4);
    height: 3.5rem;
    width: 100%;
    font-size: 1.8rem;
  }
`;

function Category({ category }) {
  const [isActive, setIsActive] = useState(false);
  const {
    searchResults,
    search: searchText,
    categoryFilter,
    inStockFilter,
    applyCategoryFilter,
    applySearchResults,
  } = useContext(SearchContext);
  useEffect(() => {
    // This effect runs whenever searchResults changes
    // console.log("Updated search results:", searchResults);
    // console.log("The search text is:", searchText);
    // console.log("The Category is:", categoryFilter);
    // console.log("The Stock is:", inStockFilter);
  }, [searchResults, searchText, categoryFilter, inStockFilter]);

  async function handleClick(e) {
    e.preventDefault();
    const res = await searchByCategory({
      categoryFilter: category.category ? category.category : "",
    });
    applySearchResults(res);
    applyCategoryFilter(category.category);
    // console.log("In the Category the response is:", res);
  }

  async function handleClick2(e) {
    const res = await searchMedicine({
      categoryFilter: "",
    });
    applySearchResults(res);
    applyCategoryFilter("");
  }

  const isSame = category.category === categoryFilter;

  return (
    <>
      <Row1 onClick={isSame ? handleClick2 : handleClick}>
        {category.category}
      </Row1>
    </>
  );
}

export default Category;
