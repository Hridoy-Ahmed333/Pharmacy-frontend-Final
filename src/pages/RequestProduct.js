import { useEffect, useState } from "react";
import { getSupplies } from "../api/supplyApi";
import styled from "styled-components";

import SupplyButtonsComponent from "../Components/SupplyButtonsComponent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  width: 100%;
  margin-top: 3rem;
`;

const StyledDiv = styled.div`
  height: 5rem;
  width: 70%;
  display: flex;
  justify-content: space-between;
  background-color: ${({ "data-index": index }) =>
    index % 2 === 0 ? "#F5F5F5" : "#FFFFFF"};
  &:hover {
    background-color: ${({ "data-index": index }) =>
      index % 2 === 0 ? "#E5E5E5" : "#f0f0f0;"};
  }
`;

const PicDiv = styled.div`
  flex: 0.5;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ButtonDiv = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const AmountDiv = styled.div`
  flex: 0.5;
  width: 100%;
  height: 100%;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const PriceDiv = styled.div`
  flex: 0.5;
  width: 100%;
  height: 100%;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const NameDiv = styled.div`
  flex: 0.5;
  width: 100%;
  height: 100%;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const DateDiv = styled.div`
  flex: 0.7;
  width: 100%;
  height: 100%;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ProductImage = styled.img`
  object-fit: cover;
  width: 85%;
  height: 85%;
  max-width: 100%;
  max-height: 100%;
`;

function RequestProduct() {
  const [supplies, setSupplies] = useState(null);

  function formatISODate(isoDateString) {
    // Create a Date object from the ISO string
    const date = new Date(isoDateString);

    // Extract the date and time components
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-based in JavaScript
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Format the date and time
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return formattedDate;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSupplies();
        setSupplies(response);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, []);
  //console.log(supplies);

  return (
    <div>
      <h1>Requested Supply Orders</h1>
      <Container>
        <StyledDiv>
          <PicDiv></PicDiv>
          <NameDiv>Name</NameDiv>
          <AmountDiv>Total Item</AmountDiv>
          <PriceDiv>Price</PriceDiv>
          <DateDiv>Date</DateDiv>
          <ButtonDiv></ButtonDiv>
        </StyledDiv>
        {supplies
          ?.slice()
          .reverse()
          .map((el, index) => {
            return (
              <StyledDiv key={el.el._id} data-index={index}>
                <PicDiv>
                  <ProductImage
                    src={`http://localhost:8080/images/${el?.product?.image}`}
                    alt="Product"
                  />
                </PicDiv>
                <NameDiv>{el?.product?.name}</NameDiv>
                <AmountDiv>{el?.el?.amount}</AmountDiv>
                <PriceDiv>{el?.el?.totalCost}</PriceDiv>
                <DateDiv>{formatISODate(el?.el?.time)}</DateDiv>
                <ButtonDiv>
                  <SupplyButtonsComponent product={el} />
                </ButtonDiv>
              </StyledDiv>
            );
          })}
      </Container>
    </div>
  );
}

export default RequestProduct;
