import { useState } from "react";
import styled from "styled-components";
import { addCategory } from "../api/categoryApi";

// const Button = styled.button`
//   background-color: #007bff; // Button color
//   color: white; // Text color
//   border: none; // Remove default button border
//   cursor: pointer; // Change cursor to pointer on hover
//   border-radius: 10%; // Make the button round
//   width: 50px; // Width of the button
//   height: 50px; // Height of the button
//   margin-left: 1rem;
//   margin-right: 1rem; // Space between the search box and the button// Use flex to center the icon inside the button
//   align-items: center; // Vertically center the icon
//   justify-content: center; // Horizontally center the icon
//   transition: background-color 0.3s ease; // Smooth transition for color change
//   height: 2.5rem;
//   width: 5rem;
//   margin: 0 auto;

//   &:hover {
//     background-color: #0056b3; // Darken the button color on hover
//   }
// `;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30rem; /* Set the width of the form */
  height: 200px; /* Set the height of the form */
  margin: 0 auto; /* Center the form horizontally */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function AddCategory({ setIsCatAdd, children }) {
  //const [isAdding, setIsAdding] = useState(false);
  return (
    <AddContainer>
      {/* <Button onClick={() => setIsAdding(!isAdding)}>
        {isAdding ? "Close" : children}
      </Button> */}

      <SimpleForm setIsCatAdd={setIsCatAdd} />
    </AddContainer>
  );
}

const SimpleForm = ({ setIsCatAdd }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted value:", inputValue);

    // Call the addCategory API function with the input value
    try {
      const categoryData = await addCategory({ category: inputValue });
      console.log("Category added successfully:", categoryData);
    } catch (error) {
      console.error("Error adding category:", error);
    }

    setInputValue(""); // Clear the input after submission
    setIsCatAdd((isAdd) => !isAdd);
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <label htmlFor="category">
        <h2>Category</h2>
      </label>
      <InputField
        type="text"
        id="category"
        name="category"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter text here..."
      />
      <SubmitButton type="submit">Add</SubmitButton>
    </FormWrapper>
  );
};

export default AddCategory;
