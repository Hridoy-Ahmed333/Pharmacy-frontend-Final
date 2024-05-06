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
  const [cart, setCart] = useState([]);
  const { setCartAmount } = useContext(CartContext);
  const cartString = localStorage.getItem("cart");
  const items = JSON.parse(cartString);

  useEffect(() => {
    async function fetchCartItems() {
      const cartString = localStorage.getItem("cart");

      if (!cartString) return;

      try {
        const items = JSON.parse(cartString);
        const product = await Promise.all(
          items.map(async (el) => {
            const pro = await getMedicineById(el.id);
            return { ...pro, total: el.totalNumber };
          })
        );
        if (cartString) {
          setCart(JSON.parse(cartString));
        } else {
        }
        setCart(product);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        // Handle the error appropriately, e.g., show an error message to the user
      }
    }

    fetchCartItems();
  }, []);

  function handleClick() {
    localStorage.removeItem("cart");
    localStorage.removeItem("cartAmount");
    setCart([]);
    setCartAmount(0);
  }
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
                {cart?.map((el, index) => (
                  <CartEl
                    el={el}
                    index={index}
                    cart={cart}
                    items={items}
                    setCart={setCart}
                    key={el._id}
                  />
                ))}
              </Container>
              <BottomEl>
                <DeleteButton onClick={handleClick}>
                  Clear The Cart
                </DeleteButton>
                <CartCheckout cart={cart} setCart={setCart} />
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
}

function CartEl({ el, index, cart, setCart, items }) {
  const { setCartAmount } = useContext(CartContext);
  function removeElement(array, elementToRemove) {
    const med = JSON.parse(localStorage.getItem("cart"));

    const medItem = med[index].totalNumber;
    const cartAmount = Number(localStorage.getItem("cartAmount"));
    const remain = cartAmount - medItem;
    setCartAmount(remain);
    localStorage.setItem("cartAmount", remain.toString());

    const newArr = array.filter((_, index) => index !== elementToRemove);
    return newArr;
  }

  async function handleClick(items, index) {
    const newItems = removeElement(items, index);
    localStorage.setItem("cart", JSON.stringify(newItems));

    const cartAmount = Number(localStorage.getItem("cartAmount"));

    const cartString = localStorage.getItem("cart");
    const newItem = JSON.parse(cartString);
    if (!cartString) return;

    const product = await Promise.all(
      newItem.map(async (el) => {
        const pro = await getMedicineById(el.id);
        return { ...pro, total: el.totalNumber };
      })
    );
    setCart(product);
  }
  return (
    <StyledDiv key={el._id} data-index={index}>
      <PicDiv>
        <ProductImage
          src={`http://localhost:8080/images/${el?.image}`}
          alt="Product"
        />
      </PicDiv>
      <NameDiv>{el?.name}</NameDiv>
      <AmountDiv>{el?.total}</AmountDiv>
      <PriceDiv>
        {el.discountPercentage ? (
          <>
            {(
              (el.price - (el.price * el.discountPercentage) / 100) *
              el.total
            ).toFixed(2)}
            <TakaSpan>৳</TakaSpan> <DiscountSpan>(with Discount)</DiscountSpan>
          </>
        ) : (
          <>
            {el?.total * el.price} <TakaSpan>৳</TakaSpan>
          </>
        )}
      </PriceDiv>

      <ButtonDiv>
        <CartButton cart={cart} setCart={setCart} index={index} />
      </ButtonDiv>
      <StockDiv>{el.stock} items are available in stock</StockDiv>
      <CrossDiv>
        <CrossButton onClick={() => handleClick(items, index)}>
          &#x274C;
        </CrossButton>
      </CrossDiv>
    </StyledDiv>
  );
}

function CartButton({ cart, setCart, index }) {
  const [value, setValue] = useState(cart[index].total);

  function change(value) {
    if (value[index].total > 0 && value[index].total <= cart[index].stock) {
      setCart(value);
      //localStorage.setItem("cart", JSON.stringify(value));
      console.log(cart);
    }
  }
  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);

    // Create a new cart array with the updated item
    const updatedCart = cart?.map((item, idx) => {
      if (idx === index) {
        return { ...item, total: newQuantity };
      }
      return item;
    });
    setValue(Number(e.target.value));
    change(updatedCart);
  };
  function handleClick(sign) {
    const newQuantity = value;
    const updatedCart = cart?.map((item, idx) => {
      if (idx === index) {
        if (sign === "-") {
          setValue(newQuantity - 1);
          return { ...item, total: newQuantity - 1 };
        }
        if (sign === "+") {
          setValue(newQuantity + 1);
          return { ...item, total: newQuantity + 1 };
        }
      }
      return item;
    });

    change(updatedCart);
  }

  return (
    <div>
      <ButtonContainer>
        <StyledButton
          // disabled={cart[index].total <= 1}
          onClick={(e) => handleClick("-")}
        >
          &#x2212;
        </StyledButton>
        <StyledInput
          type="number"
          value={value}
          onChange={handleQuantityChange}
        />
        <StyledButton
          //disabled={cart[index].stock - 1 < cart[index].total}
          onClick={() => handleClick("+")}
        >
          &#x2B;
        </StyledButton>
      </ButtonContainer>
    </div>
  );
}

export default Cart;
