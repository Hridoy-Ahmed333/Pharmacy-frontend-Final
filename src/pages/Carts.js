import { useContext, useEffect, useState } from "react";
import { getMedicineById } from "../api/medicineApi";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";
import CartCheckout from "../Components/CartCheckout";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  width: 100%;
  margin-top: 3rem;
`;

const StyledDiv = styled.div`
  height: 5rem;
  width: 70%;
  display: flex;
  justify-content: space-between;
  background-color: ${({ "data-index": index }) =>
    index % 2 === 0 ? "#F5F5F5" : "#FFFFFF"};
  &:hover {
    background-color: ${({ "data-index": index }) =>
      index % 2 === 0 ? "#E5E5E5" : "#f0f0f0;"};
  }
`;

const PicDiv = styled.div`
  flex: 0.5;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ButtonDiv = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const AmountDiv = styled.div`
  flex: 0.5;
  width: 100%;
  height: 100%;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const PriceDiv = styled.div`
  flex: 0.8;
  width: 100%;
  height: 100%;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const NameDiv = styled.div`
  flex: 0.5;
  width: 100%;
  height: 100%;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const StockDiv = styled.div`
  flex: 0.5;
  width: 100%;
  height: 100%;
  font-weight: 700;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const CrossDiv = styled.div`
  flex: 0.2;
  width: 100%;
  height: 100%;
  font-weight: 700;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ProductImage = styled.img`
  object-fit: cover;
  width: 85%;
  height: 85%;
  max-width: 100%;
  max-height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
`;
const TakaSpan = styled.span`
  font-size: 1rem;
  font-weight: 800;
  margin-left: 0.2rem;
  margin-right: 0.5rem;
`;
const DiscountSpan = styled.span`
  font-size: 0.7rem;
  font-weight: 800;
  color: red;
`;
const StyledButton = styled.button`
  display: flex;
  font-size: 0.7rem;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  height: 2rem;
  width: 2rem;
  background-color: #4caf50;
  color: white;
  border: none;
  margin: 0 0.5rem;
  border-radius: 10000px;
  cursor: pointer;
  transition: background-color 0.3s ease, height 0.3s ease, width 0.3s ease,
    font-size 0.3s ease, font-width 0.3s ease;

  &:hover {
    background-color: #45a049;
    height: 2.5rem;
    width: 2.5rem;
    font-size: 1.7rem;
    font-weight: 800;
  }
`;
const DeleteButton = styled.button`
  display: flex;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  width: 11rem;
  font-size: 1rem;
  font-weight: 700;
  background-color: #ff8c00;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 4rem;
  margin-left: 13rem;
  transition: background-color 0.3s ease, height 0.3s ease, width 0.3s ease,
    font-size 0.3s ease, font-width 0.3s ease;

  &:hover {
    background-color: #ff6347;
    height: 3rem;
    width: 13rem;
    font-size: 1.2rem;
    font-weight: 800;
  }
`;

const StyledInput = styled.input`
  width: 3rem;
  text-align: center;
  border: 1px solid #ccc;
  padding: 0.5rem;
`;
const CrossButton = styled.button`
  display: flex;
  font-size: 0.7rem;
  justify-content: center;
  align-items: center;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 1000px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
  &:hover {
    color: aliceblue;
    background-color: red; // Darker shade on hover
    transform: scale(1.15); // Slightly enlarge the button on hover
  }
`;

const NoItem = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: red;
`;

const BottomEl = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

function Cart() {
  const [items, setItems] = useState(null);
  const [cart, setCart] = useState(false);

  useEffect(() => {
    async function runFirst() {
      const med = JSON.parse(localStorage.getItem("cart"));
      setItems(() => med);
    }
    runFirst();
  }, [cart]);

  function handleClick() {
    localStorage.removeItem("cart");
    localStorage.removeItem("cartAmount");
    setItems([null]);
  }

  return (
    <div>
      return (
      <div>
        <div>
          <h1>Cart Items</h1>
          {items ? (
            items.length > 0 ? (
              <div>
                <Container>
                  <StyledDiv>
                    <PicDiv></PicDiv>
                    <NameDiv>Name</NameDiv>
                    <AmountDiv>Total Item</AmountDiv>
                    <PriceDiv>Price</PriceDiv>
                    <ButtonDiv></ButtonDiv>
                    <StockDiv></StockDiv>
                    <CrossDiv></CrossDiv>
                  </StyledDiv>
                  {items?.map((el, index) => (
                    <CartEl
                      key={el.id}
                      med={el.id}
                      index={index}
                      totalNumber={el.totalNumber}
                      setCart={setCart}
                    />
                  ))}
                </Container>
                <BottomEl>
                  <DeleteButton onClick={handleClick}>
                    Clear The Cart
                  </DeleteButton>
                  <CartCheckout />
                </BottomEl>
              </div>
            ) : (
              <Container>
                <NoItem>No Item in The Cart</NoItem>
              </Container>
            )
          ) : (
            <Container>
              <NoItem>No Item in The Cart</NoItem>
            </Container>
          )}
        </div>
      </div>
      );
    </div>
  );
}

function CartEl({ med, index, totalNumber, setCart }) {
  const [items, setItems] = useState(null);
  const [el, setEl] = useState(null);
  const { setCartAmount } = useContext(CartContext);

  function removeElement(array, elementToRemove) {
    // Get the current cart from local storage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Calculate the new cart amount by subtracting the totalNumber of the item to remove
    const cartAmount = Number(localStorage.getItem("cartAmount")) || 0;
    const itemToRemove = cart[elementToRemove];
    const itemTotalNumber = itemToRemove?.totalNumber || 0;
    const newCartAmount = cartAmount - itemTotalNumber;

    // Update the cartAmount in local storage
    localStorage.setItem("cartAmount", newCartAmount.toString());

    // Remove the item from the cart array
    const newArr = array.filter((_, index) => index !== elementToRemove);

    // Update the cart in local storage
    localStorage.setItem("cart", JSON.stringify(newArr));

    return newArr;
  }

  async function handleClick(items, index) {
    const newItems = removeElement(items, index);
    localStorage.setItem("cart", JSON.stringify(newItems));
    setCart((a) => !a);
  }

  useEffect(() => {
    async function fetchData() {
      const medi = JSON.parse(localStorage.getItem("cart"));
      setItems(medi);
      if (med) {
        const res = await getMedicineById(med);
        setEl(res);
      }
    }
    fetchData();
  }, [med]); // Removed `el` from the dependency array
  console.log(el);

  if (!el) {
    return <div>Loading...</div>;
  }

  return (
    <StyledDiv key={el?._id} data-index={index}>
      <PicDiv>
        <ProductImage
          src={`http://localhost:8080/images/${el?.image}`}
          alt="Product"
        />
      </PicDiv>
      <NameDiv>{el?.name}</NameDiv>
      <AmountDiv>{totalNumber}</AmountDiv>
      <PriceDiv>
        {el?.discountPercentage ? (
          <>
            {(
              (el.price - (el.price * el.discountPercentage) / 100) *
              totalNumber
            ).toFixed(2)}
            <TakaSpan>৳</TakaSpan> <DiscountSpan>(with Discount)</DiscountSpan>
          </>
        ) : (
          <>
            {totalNumber * el?.price} <TakaSpan>৳</TakaSpan>
          </>
        )}
      </PriceDiv>

      <ButtonDiv>
        <CartButton />
      </ButtonDiv>
      <StockDiv>{el?.stock} items are available in stock</StockDiv>
      <CrossDiv>
        <CrossButton onClick={() => handleClick(items, index)}>
          &#x274C;
        </CrossButton>
      </CrossDiv>
    </StyledDiv>
  );
}

function CartButton() {}

export default Cart;
