import React, { useContext } from "react";
import styled from "styled-components";
import { deleteMedicine } from "../api/medicineApi";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

// Define a styled component for the product card container
const CardContainer = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  overflow: hidden;
  width: 300px;
  height: 370px;
  margin: 1em;
  position: relative;
  transition: height 0.3s ease, width 0.4s ease;
  // Add this line to allow absolute positioning of children
  &:hover {
    width: 320px;
    height: 400px;
    box-shadow: 0 15px 20px rgba(0, 0, 0, 0.2);
  }
`;

// Define a styled component for the product image
const CardImage = styled.img`
  width: 100%;
  height: 45%;
`;

// Define a styled component for the product details
const CardDetails = styled.div`
  width: 90%;
  padding: 1em;
  text-align: center;
`;

// Define a styled component for the product name
const CardName = styled.h2`
  margin: 0;
  font-size: 1.3rem;
  width: 100%;
`;

// Define a styled component for the product price
const CardPrice = styled.p`
  margin: 0.5em 0;
  font-weight: bold;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

// Define a styled component for the product discount
const CardDiscount = styled.p`
  margin: 0.5em 0;
  font-style: italic;
  color: #ff0000;
`;

// Define a styled component for the product availability
const CardAvailability = styled.p`
  margin: 0.5em 0;
  font-style: italic;
  font-size: 1rem;
  font-weight: 500;
  color: green;
`;

// Define a styled component for the product category
const CardCategory = styled.p`
  margin: 0.5em 0;
  font-style: italic;
  font-size: 1rem;
  font-weight: 700;
`;

const DeleteButton = styled.button`
  position: absolute;
  bottom: 1px;
  right: 1px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;
const Span = styled.span`
  font-weight: 800;
`;

const ProductCard = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const isAdmin = user.role === "admin";
  const handleDelete = async () => {
    if (typeof onDelete === "function") {
      await onDelete(product._id);
    }
  };
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/${product._id}`);
  };

  return (
    <CardContainer>
      <CardImage
        onClick={(e) => handleClick(e)}
        src={`http://localhost:8080/images/${product.image}`}
        alt={product.name}
      />
      <CardDetails>
        <CardName onClick={(e) => handleClick(e)}>{product.name}</CardName>

        <PriceContainer onClick={(e) => handleClick(e)}>
          <CardPrice>
            <Span>৳</Span>
            {product.price}
          </CardPrice>
          {product.discountPercentage >= 0 && (
            <CardDiscount>Discount: {product.discountPercentage}%</CardDiscount>
          )}
        </PriceContainer>

        <CardAvailability onClick={(e) => handleClick(e)}>
          Available in stock:{" "}
          {product.stock ? `${product.stock} available` : "Out of stock"}
        </CardAvailability>
        <CardCategory onClick={(e) => handleClick(e)}>
          Category: {product.category}
        </CardCategory>
      </CardDetails>
      {isAdmin && <DeleteButton onClick={handleDelete}>Delete</DeleteButton>}
    </CardContainer>
  );
};

export default ProductCard;
