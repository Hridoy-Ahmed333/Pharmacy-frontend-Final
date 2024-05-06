import { useContext } from "react";
import SingleProductContext from "../context/SingleProductContext";
import styled from "styled-components";

const StarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  min-width: 25rem;
  border-radius: 5%;
  flex-direction: row;
  margin-top: 2rem;
  padding: 1rem; /* Increased padding for better spacing */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  height: 5rem;
  background: linear-gradient(
    135deg,
    #f5f7fa 0%,
    #c3cfe2 100%
  ); /* Gradient background */
  border: 1px solid #e0e6ed; /* Border around the container */
  transition: transform 0.3s ease; /* Smooth transition for transform */

  &:hover {
    transform: scale(1.05); /* Slightly enlarge the container on hover */
  }
`;

const RatingText = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
  color: #333;
  font-family: "Arial", sans-serif; /* Use a sans-serif font for a modern look */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); /* Add a subtle text shadow for depth */
  transition: color 0.3s ease; /* Smooth transition for color change */

  &:hover {
    color: rgb(255, 100, 0); /* Change color on hover to match the star */
  }
`;

const StarIcon = styled.span`
  width: 44px;
  height: 44px;
  display: block;
  cursor: pointer;
  fill: rgb(255, 244, 100); /* Golden color for the star */
  stroke: rgb(255, 215, 0); /* Golden color for the star border */
`;

function TotalRating() {
  const { product } = useContext(SingleProductContext);
  return (
    <StarContainer>
      <RatingText>
        This product is rated {product?.rating?.toFixed(2)}
      </RatingText>
      <StarIcon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0  0  20  20">
          <path d="M9.049  2.927c.3-.921  1.603-.921  1.902  0l1.07  3.292a1  1  0  00.95.69h3.462c.969  0  1.371  1.24.588  1.81l-2.8  2.034a1  1  0  00-.364  1.118l1.07  3.292c.3.921-.755  1.688-1.54  1.118l-2.8-2.034a1  1  0  00-1.175  0l-2.8  2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1  1  0  00-.364-1.118L2.98  8.72c-.783-.57-.38-1.81.588-1.81h3.461a1  1  0  00.951-.69l1.07-3.292z" />
        </svg>
      </StarIcon>
    </StarContainer>
  );
}

export default TotalRating;
