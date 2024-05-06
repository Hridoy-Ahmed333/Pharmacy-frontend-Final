import AddCategory from "../Components/AddCategory";
import TableCategory from "../Components/TableCategory";
import styled from "styled-components";

const CategoryContainer = styled.div`
  display: flex;

  gap: 2rem;
`;

function AddingCategoryTab({ isCatAdd, setIsCatAdd }) {
  return (
    <CategoryContainer>
      <AddCategory setIsCatAdd={setIsCatAdd} />
      <TableCategory isCatAdd={isCatAdd} setIsCatAdd={setIsCatAdd} />
    </CategoryContainer>
  );
}

export default AddingCategoryTab;
