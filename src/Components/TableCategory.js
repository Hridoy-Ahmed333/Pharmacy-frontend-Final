// StyledTable.js
import styled from "styled-components";
import {
  deleteCategory,
  getCategories,
  updateCategory,
} from "../api/categoryApi";
import { useEffect, useState } from "react";

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background-color: #f8f9fa;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

export const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #dee2e6;
  min-width: 50%;
`;

export const DeleteButton = styled.button`
  background-color: #dc3545;
  height: 2rem;
  width: 5rem;
  border-radius: 15%;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;

export const EditButton = styled.button`
  margin-left: 4rem;
  background-color: rgb(33, 66, 30);
  height: 2rem;
  width: 4rem;
  border-radius: 15%;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: rgb(59, 122, 87);
  }
`;

const ButtonComponent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

function TableCategory({ isCatAdd, setIsCatAdd }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [currentCategoryName, setCurrentCategoryName] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, [isCatAdd]);

  const handleDelete = async (categoryId) => {
    try {
      const result = await deleteCategory(categoryId);
      console.log("Category deleted successfully:", result);
      // Remove the deleted category from the local state
      setCategories(
        categories.filter((category) => category._id !== categoryId)
      );
    } catch (err) {
      console.error("Error deleting category:", err);
    }
    await setIsCatAdd((isCatAdd) => !isCatAdd);
    console.log(`Deleting category with ID: ${categoryId}`);
  };
  const handleStartEdit = (category) => {
    setEditingCategory(category);
    setCurrentCategoryName(category.category);
  };
  const handleUpdate = async () => {
    try {
      const updatedCategory = await updateCategory(
        editingCategory._id,
        currentCategoryName
      );
      console.log("Category updated successfully:", updatedCategory);
      // Update the local state with the updated category
      setCategories(
        categories.map((category) =>
          category._id === editingCategory._id ? updatedCategory : category
        )
      );
      setEditingCategory(null);
      setCurrentCategoryName("");
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };
  if (loading) {
    console.log("Loading");
  }
  if (error) {
    console.log("The Error is:", error);
  }
  return (
    <TableContainer>
      <TableHeader>
        <TableRow>
          <TableCell>Category Name</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHeader>
      <tbody>
        {categories.map((category) => (
          <TableRow key={category._id}>
            <TableCell>
              {editingCategory && editingCategory._id === category._id ? (
                <input
                  type="text"
                  value={currentCategoryName}
                  onChange={(e) => setCurrentCategoryName(e.target.value)}
                />
              ) : (
                category.category
              )}
            </TableCell>
            <TableCell>
              <ButtonComponent>
                {editingCategory && editingCategory._id === category._id ? (
                  <EditButton onClick={handleUpdate}>Save</EditButton>
                ) : (
                  <>
                    <EditButton onClick={() => handleStartEdit(category)}>
                      Edit
                    </EditButton>
                    <DeleteButton onClick={() => handleDelete(category._id)}>
                      Delete
                    </DeleteButton>
                  </>
                )}
              </ButtonComponent>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </TableContainer>
  );
}

export default TableCategory;
