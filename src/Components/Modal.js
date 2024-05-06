// Modal.js
import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { ModalContext } from "../context/ModalContext";
//import { CartContext } from "../context/CartContext";

const fadeIn = keyframes`
  0% {
    opacity: 0;
 }
  100% {
    opacity: 1;
 }
`;

const slideUp = keyframes`
  0% {
    transform: translateY(20px);
    opacity: 0;
 }
  100% {
    transform: translateY(0);
    opacity: 1;
 }
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  animation: ${fadeIn} 1s ease-out;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    animation: ${fadeIn} 1s ease-out;
  }
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 60%;
  height: 30rem;
  animation: ${slideUp} 1s ease-out forwards;
`;
function Modal({ children }) {
  const { show, setShow } = useContext(ModalContext);
  if (!show) return null;

  return (
    <ModalWrapper onClick={() => setShow(!show)}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalWrapper>
  );
}

export default Modal;
