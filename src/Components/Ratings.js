import { useContext, useState } from "react";
import StarRating from "./StarRating";
import styled from "styled-components";
import SingleProductContext from "../context/SingleProductContext";
import { updateMedicine, updateStar } from "../api/medicineApi";
import UserContext from "../context/UserContext";

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  min-width: 25rem;
  border-radius: 10%;
  background-color: rgba(240, 255, 160, 0.3);
  flex-direction: column;
  margin-top: 2rem;
  gap: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
`;

const StyledDiv = styled.div`
  margin: 0 auto;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 700;
  color: red;
`;

const Button = styled.button`
  height: 3rem;
  width: 15rem;
  cursor: pointer;
  background-color: rgb(100, 200, 0);
  border-radius: 10rem;
  font-weight: 750;
  font-size: 1.5rem;
  color: black;
  margin: 2rem auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.8);
  border: none;
  margin-bottom: 1rem;
  transition: background-color 0.3s ease, height 0.3s ease, width 0.3s ease;
  &:hover {
    box-shadow: 0 10px 12px rgba(0, 0, 0, 0.4);
    height: 4rem;
    width: 18rem;
    font-size: 2rem;
    margin: 2rem auto;
    transition: background-color 0.3s ease, height 0.3s ease, width 0.3s ease;
  }
`;

const ButtonRating = styled.button`
  height: 3rem;
  width: 15rem;
  cursor: pointer;
  background-color: rgb(100, 200, 0);
  border-radius: 10rem;
  font-weight: 750;
  font-size: 1.5rem;
  color: black;
  margin: 2rem auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.8);
  border: none;
  margin-bottom: 1rem;
  transition: background-color 0.3s ease, height 0.3s ease, width 0.3s ease;
  &:hover {
    box-shadow: 0 10px 12px rgba(0, 0, 0, 0.4);
    height: 4rem;
    width: 18rem;
    transition: background-color 0.3s ease, height 0.3s ease, width 0.3s ease;
    font-size: 2rem;
  }
`;

function Ratings() {
  const { product, render, setRender } = useContext(SingleProductContext);
  const [CurRating, setCurRating] = useState();
  const [giveRating, setGiveRating] = useState(false);
  const { user } = useContext(UserContext);
  async function calculate() {
    const totRating = product?.totalRating;
    const updatedTotalRating = totRating + 1;
    const rat = product?.rating;
    const avg = (rat * totRating + CurRating) / updatedTotalRating;
    return { rating: avg, totalRating: updatedTotalRating };
  }

  async function handleRating(e) {
    e.preventDefault();
    const calculatedRating = await calculate();
    console.log(calculatedRating);
    await updateStar(calculatedRating, product._id);
    setRender(!render);
    setGiveRating(!giveRating);
  }

  function handleClick() {
    setGiveRating(!giveRating);
  }

  return (
    <Container>
      <ButtonRating onClick={handleClick}>
        {!giveRating ? "Give Rating" : "Close"}
      </ButtonRating>
      {giveRating && (
        <>
          <StarRating maxRating={10} size={36} onSetRating={setCurRating} />
          {user.role === "user" ? (
            <Button onClick={handleRating}>Add Rating</Button>
          ) : user.role === "admin" ? (
            <StyledDiv> Admin Cannot give ratings</StyledDiv>
          ) : (
            <StyledDiv>Sign in to give rating</StyledDiv>
          )}
        </>
      )}
    </Container>
  );
}

export default Ratings;
