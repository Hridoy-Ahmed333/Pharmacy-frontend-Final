import { useEffect, useState } from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  width: 100%;
  margin-top: 3rem;
`;

const StyledDiv = styled.div`
  display: flex;
  min-height: 5rem;
  width: 70%;
  justify-content: space-between;
  width: 100%;
  background-color: ${({ "data-index": index }) =>
    index % 2 === 0 ? "#F5F5F5" : "#FFFFFF"};
  &:hover {
    background-color: ${({ "data-index": index }) =>
      index % 2 === 0 ? "#E5E5E5" : "#f0f0f0;"};
  }
`;

const NameDiv = styled.div`
  flex: 1;
  display: flex;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const DateDiv = styled.div`
  flex: 0.7;
  display: flex;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const AddressDiv = styled.div`
  flex: 1;
  display: flex;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const StatusDiv = styled.div`
  flex: 0.5;
  display: flex;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StatusDilDiv = styled.div`
  flex: 0.5;
  display: flex;
  color: green;
  font-size: 1rem;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const StatusPenDiv = styled.div`
  flex: 0.5;
  display: flex;
  color: red;
  font-size: 1rem;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

function UsersOrder({ order }) {
  return (
    <Container>
      <StyledDiv>
        <NameDiv>Name</NameDiv>
        <AddressDiv>Address</AddressDiv>
        <DateDiv>Date</DateDiv>
        <StatusDiv>Status</StatusDiv>
      </StyledDiv>
      {order
        ?.slice()
        .reverse()
        .map((el, index) => (
          <StyledDiv key={el?._id} data-index={index}>
            <NameDiv>
              <Name medicines={el?.medicines} />
            </NameDiv>
            <AddressDiv>{el?.address}</AddressDiv>
            <DateDiv>
              {el?.date && (
                <DateDiv>
                  <Date dateString={el?.date} />
                </DateDiv>
              )}
            </DateDiv>
            <StatusDiv>
              {el?.status ? (
                <StatusDilDiv>Dilevered</StatusDilDiv>
              ) : (
                <StatusPenDiv>Order Pending</StatusPenDiv>
              )}
            </StatusDiv>
          </StyledDiv>
        ))}
    </Container>
  );
}

function Name({ medicines }) {
  console.log(medicines);
  const medArr = medicines?.map((el) => {
    return `${el?.name} (${el?.inTotal} ${
      el?.inTotal > 1 ? "Pieces" : "Piece"
    })`;
  });

  const name = medArr.join(", ");
  return <div>{name}</div>;
}

function Date({ dateString }) {
  const [ampm, setAmpm] = useState("am");
  const [hours, setHour] = useState("");
  const [date, setDate] = useState("");
  const [min, setMin] = useState("");

  useEffect(() => {
    const indexOfT = dateString.indexOf("T");
    const result = dateString.substring(0, indexOfT); // Date
    setDate(result);
    const time = dateString.substring(indexOfT + 1);
    const indexOfDot = time.indexOf(".");
    const result2 = time.substring(0, indexOfDot); // The whole hour, min and sec
    const lastHourIndex = result2.indexOf(":");
    const result3 = result2.substring(0, lastHourIndex); // Hour in String
    const result4 = result2.substring(lastHourIndex + 1);
    setMin(result4);
    let hour = Number(result3);
    // Adjust for Bangladesh time (UTC+6)
    hour += 6;
    if (hour >= 24) {
      hour -= 24; // Adjust for overflow
    }
    if (hour >= 12) {
      setAmpm("pm");
      setHour(String(hour % 12 || 12)); // Correctly handle 12 PM
    } else {
      setHour(String(hour));
    }
  }, [dateString]);
  const orderDate = `Date: ${date} `;
  const orderTime = `Time: ${hours}:${min} ${ampm}`;

  return (
    <div>
      <div>{orderDate}</div>
      <div>{orderTime}</div>
    </div>
  );
}

export default UsersOrder;
