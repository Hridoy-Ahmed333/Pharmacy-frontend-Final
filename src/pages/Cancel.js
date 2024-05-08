import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Define styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f0f0f0; // Example background color
`;

const Message = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
  color: red;
  margin-bottom: 4rem;
`;

const Button = styled.button`
  background: linear-gradient(to right, #28a745, #20c997);
  color: white;
  border: none;
  padding: 10px 20px;
  width: 17rem;
  height: 3rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 20px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #20c997, #28a745);
    transform: scale(1.1); // Increase the size by 10%
    box-shadow: 0px 10px 20px 5px rgba(0, 0, 0, 0.5);
  }
`;

function Cancel() {
  const navigate = useNavigate();
  function goBack() {
    navigate("/");
  }
  return (
    <Container>
      <Message>You Canceled the order</Message>
      <Button onClick={goBack}>Go Back To The Main Page</Button>
    </Container>
  );
}

export default Cancel;
