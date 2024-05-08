import styled from "styled-components";
import SingleProductContext from "../context/SingleProductContext";
import { useContext, useState } from "react";
import ProductDescription from "./ProductDescription";
import { ModalContext } from "../context/ModalContext";
import UserContext from "../context/UserContext";
import Restock from "./Restock";

const Container = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Name = styled.div`
  font-size: 3rem;
  font-weight: 700;
`;
const Cat = styled.span`
  color: blue;
  font-size: 1.5rem;
  font-weight: bold;
`;
const Brand = styled.span`
  color: green;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 4rem;
  margin-bottom: 2rem;
`;

const RestockButton = styled.button`
  background: linear-gradient(to right, #ffa500, #ff4500);
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 20px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #ff4500, #ffa500);
    transform: scale(1.1); // Increase the size by 10%
    box-shadow: 0px 10px 20px 5px rgba(0, 0, 0, 0.5);
  }
`;

const EditButton = styled.button`
  background: linear-gradient(to right, #007bff, #00c6ff);
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 20px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #00c6ff, #007bff);
    transform: scale(1.1); // Increase the size by 10%
    box-shadow: 0px 10px 20px 5px rgba(0, 0, 0, 0.5);
  }
`;

const RestockContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-direction: row;
  justify-content: center;
`;
const Stock = styled.span`
  color: red;
  font-size: 1.5rem;
  font-weight: bold;
`;

function ProductCol1() {
  const [res, setRes] = useState(false);
  const { product } = useContext(SingleProductContext);
  const { show, setShow } = useContext(ModalContext);
  const { user } = useContext(UserContext);
  const isAdmin = user?.role === "admin";
  function handleClick() {
    setShow(!show);
  }
  function handleClick2() {
    setRes(!res);
  }
  return (
    <Container>
      {/* <div>{user?.role}</div> */}
      <Name>{product?.name}</Name>
      <Cat>{product?.category}</Cat>
      <Brand>{product?.brand}</Brand>
      {product?.stock ? (
        <Stock>
          {product?.stock} {product?.stock === 1 ? "piece is" : "pieces are"}
          {}
          avilabe in Stock
        </Stock>
      ) : (
        <Stock>Currently This Medicine is Unavailabe</Stock>
      )}
      <ProductDescription product={product} />
      {isAdmin && (
        <ButtonContainer>
          <EditButton onClick={handleClick}>Manage Medicine</EditButton>
          <RestockButton onClick={handleClick2}>
            {res ? "Close" : "Restock Button"}
          </RestockButton>
        </ButtonContainer>
      )}
      <RestockContainer>
        {res && <Restock product={product} setRes={setRes} />}
      </RestockContainer>
    </Container>
  );
}

export default ProductCol1;
