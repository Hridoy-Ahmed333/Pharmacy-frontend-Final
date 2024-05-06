import { useContext, useEffect } from "react";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  height: 2.5rem;
  margin: 0 auto;
  margin-top: 0.5rem;
  width: 13rem;
  font-size: 1rem;
  font-weight: 700;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  transition: background-color 0.3s ease, height 0.3s ease, width 0.3s ease,
    font-size 0.3s ease, font-width 0.3s ease;

  &:hover {
    background-color: #45a049;
    height: 3.5rem;
    width: 17rem;
    font-size: 1.2rem;
    font-weight: 800;
  }
`;
const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 2rem;
  width: 19rem;
  font-size: 1rem;
  font-weight: 700;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  color: white;
  transition: background 0.3s ease;

  &:hover {
    background: #feb47b; /* Change background on hover */
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  margin-right: 13rem;
  gap: 0.1rem;
`;

function CartCheckout({ cart, setCart }) {
  // console.log(cart);
  const {
    cart: context,
    setCart: setContext,
    cartAmount,
    setCartAmount,
  } = useContext(CartContext);

  useEffect(() => {
    setContext(cart);
  }, [cart, setContext]);
  const navigate = useNavigate();
  const totalItem = cart?.reduce((accumulator, currentValue) => {
    const totalItem = accumulator + currentValue.total;
    return totalItem;
  }, 0);

  const totalValue = cart?.reduce((accumulator, currentValue) => {
    if (currentValue.discountPercentage > 0) {
      const totalItem =
        accumulator +
        (currentValue.price -
          (currentValue.price * currentValue.discountPercentage) / 100) *
          currentValue.total;
      return totalItem;
    } else {
      const totalItem = accumulator + currentValue.price * currentValue.total;
      return totalItem;
    }
  }, 0);
  const OrderItemDetails = cart?.map((el) => {
    return {
      id: el._id,
      name: el.name,
      inTotal: el.total,
      // sellPrice: el.discountPercentage
      //   ? (el.price - (el.price * el.discountPercentage) / 100) * el.total
      //   : el.price * el.total,
    };
  });
  const order = {
    totalItem: totalItem,
    totalValue: totalValue,
    OrderItemDetails: OrderItemDetails,
  };

  async function clickHandle() {
    localStorage.setItem("order", JSON.stringify(order));
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (token) {
      navigate("/checkout");
    } else {
      alert("Please Log in to buy a product");
      navigate("/login");
    }
  }
  return (
    <Container>
      <StyledDiv>You Have {order.totalItem} Items in Your Cart</StyledDiv>
      <StyledDiv>Total Price: {order.totalValue.toFixed(2)} Taka</StyledDiv>
      <Button onClick={clickHandle}>Order</Button>
    </Container>
  );
}

export default CartCheckout;
