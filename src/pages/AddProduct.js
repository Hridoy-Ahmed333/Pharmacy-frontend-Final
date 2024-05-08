import styled from "styled-components";
import AddingCategoryTab from "../Components/AddingCategoryTab";
import AddProductForm from "../Components/AddProductForm";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  height: 2.5rem;
  width: 15rem;
  font-size: 1rem;
  font-weight: 750;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.6);
  margin: 0 auto;
  background: linear-gradient(to right, #40e0d0, #00b4db);
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 10px 12px rgba(0, 0, 0, 0.4);
    background: linear-gradient(to right, #00b4db, #40e0d0);
  }
`;

const AddProductContainer = styled.div`
  width: 50rem;
  margin: 0 auto;
`;

function AddProduct() {
  const [isCatAdd, setIsCatAdd] = useState(false);
  const [wantToAddCat, setWantToAddCadd] = useState(false);
  return (
    <div>
      <Container>
        <AddProductContainer>
          <AddProductForm isCatAdd={isCatAdd} />
        </AddProductContainer>
        <Button onClick={() => setWantToAddCadd(!wantToAddCat)}>
          {wantToAddCat ? "Close The Tab" : "Manage Category"}
        </Button>
        {wantToAddCat && (
          <AddingCategoryTab isCatAdd={isCatAdd} setIsCatAdd={setIsCatAdd} />
        )}
      </Container>
    </div>
  );
}

export default AddProduct;
