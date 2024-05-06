import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SearchContext } from "../context/SearchContext";
import { getMedicine, searchMedicine } from "../api/medicineApi";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { FaCartPlus } from "react-icons/fa6";
import Logout from "./Logout";
const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 4.8rem;
  background-color: rgb(173, 255, 47);
  border-bottom: 1px solid rgb(0, 128, 0);

  @media (max-width: 1470px) {
    padding: 1rem;
    /* flex-direction: column; */
  }
`;

const SiteName = styled.span`
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  color: #6f42c1; // A vibrant purple color
  transition: color 0.3s ease, font-size 0.3s ease;
  font-style: italic;

  &:hover {
    color: #28a745; // A vibrant green color for hover effect
    font-size: 2.2rem; // Increase font size on hover
  }
`;
const SearchButton = styled.button`
  background-color: #007bff; // Button color
  color: white; // Text color
  border: none; // Remove default button border
  cursor: pointer; // Change cursor to pointer on hover
  border-radius: 10%; // Make the button round
  width: 50px; // Width of the button
  height: 50px; // Height of the button
  margin-left: 1rem;
  margin-right: 1rem; // Space between the search box and the button// Use flex to center the icon inside the button
  align-items: center; // Vertically center the icon
  justify-content: center; // Horizontally center the icon
  transition: background-color 0.3s ease; // Smooth transition for color change
  height: 2.5rem;
  width: 5rem;

  &:hover {
    background-color: #0056b3; // Darken the button color on hover
  }
`;

const SearchBox = styled.input.attrs({
  type: "search",
  placeholder: "Search...",
})`
  width: 400px;
  height: 50px;
  margin-left: 5rem;

  @media (max-width: 1450px) {
    width: 400px;
    margin-left: 4rem;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;

  @media (max-width: 1470px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: 1.25rem; // Increase the font size
  font-weight: 500;
  transition: color 0.3s ease; // Make the text bolder
  &:hover {
    color: rgb(0, 100, 0);
  }

  @media (max-width: 1470px) {
    font-size: 1rem;
  }
`;

// ... rest of the Header component ...

// Update the Header component to include the new elements
function Header() {
  const { cartAmount } = useContext(CartContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {
    searchResults,
    search: searchText,
    categoryFilter,
    inStockFilter,
    applySearch,
    applySearchResults,
  } = useContext(SearchContext);
  const { user } = useContext(UserContext);
  const showSearchBox = location.pathname === "/";
  useEffect(() => {
    // This effect runs whenever searchResults changes
    // console.log("Updated search results:", searchResults);
    // console.log("The search text is:", searchText);
    // console.log("The Category is:", categoryFilter);
    // console.log("The Stock is:", inStockFilter);
  }, [searchResults, searchText, categoryFilter, inStockFilter]);
  async function handleClick(e) {
    e.preventDefault();
    const res = await searchMedicine({
      searchText: search ? search : "",
    });
    applySearchResults(res);
    applySearch(search);

    // console.log("In the Header the response is:", res);
  }

  const handleHeaderClick = async (e) => {
    e.preventDefault();
    const response = await getMedicine();
    applySearchResults(response);
    setSearch("");
    navigate(`/`);
  };

  const isAdmin = user?.role === "admin";
  const isSupplier = user?.role === "supplier";
  const isUser = user?.role === "user";

  return (
    <HeaderWrapper>
      <div>
        <SiteName onClick={handleHeaderClick}>Hridoy Pharma</SiteName>

        {showSearchBox && (
          <>
            <SearchBox
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SearchButton onClick={handleClick}>Search</SearchButton>
          </>
        )}
      </div>
      <NavLinks>
        {isAdmin && <NavLink href="/other">Dashboard</NavLink>}
        {isSupplier && <NavLink href="request">Request</NavLink>}
        {isAdmin && <NavLink href="addProduct">Add Product</NavLink>}
        {isAdmin && <NavLink href="adminOrders">Orders</NavLink>}
        <NavLink href="/">Products</NavLink>
        {!isAdmin && (
          <>
            {cartAmount ? (
              <NavLink href="/cart">
                <FaCartPlus size={32} color="red" />
                {cartAmount ? "!" : ""}
              </NavLink>
            ) : (
              <NavLink href="/cart">
                <FaCartPlus size={32} />
              </NavLink>
            )}
          </>
        )}

        {isUser && <NavLink href="/userOrder">User Order</NavLink>}
        {user?.role === "visitor" ? (
          <NavLink href="/login">Sign in</NavLink>
        ) : (
          <Logout />
        )}
      </NavLinks>
    </HeaderWrapper>
  );
}

export default Header;
