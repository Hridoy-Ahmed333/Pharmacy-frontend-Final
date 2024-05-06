import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import UserContext from "../context/UserContext";
import styled from "styled-components";

const NavLink = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: 1.25rem; // Increase the font size
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease; // Make the text bolder
  &:hover {
    color: rgb(0, 100, 0);
  }

  @media (max-width: 1470px) {
    font-size: 1rem;
  }
`;

function Logout() {
  const { cart, setCart, cartAmount, setCartAmount } = useContext(CartContext);
  const { resetUserContext } = useContext(UserContext);

  const navigate = useNavigate();
  function handleClick() {
    setCart({});
    setCartAmount(0);
    resetUserContext();
    localStorage.removeItem("user");
    localStorage.removeItem("cartAmount");
    localStorage.removeItem("cart");
    localStorage.removeItem("order");
    navigate("/login");
  }
  return <NavLink onClick={handleClick}>Logout</NavLink>;
}

export default Logout;
