// import { useEffect, useState } from "react";
// import { getMedicine } from "../api/medicineApi";
// import styled from "styled-components";
// import TotalReportComp from "../Components/TotalReportComp";
// import AllMedRep from "../Components/AllMedRep";

// const ParentContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 3rem;
// `;
// const CustomH1 = styled.span`
//   font-size: 2.5rem; // Typical font size for h1
//   font-weight: bold; // Typical font weight for h1
//   color: #28a745; // Green color
//   margin-top: 1rem; // To mimic h1's default margin
//   margin-bottom: 0.5rem; // To mimic h1's default margin
// `;
// function Other() {
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getMedicine();
//         setProducts(response);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <ParentContainer>
//       <CustomH1>Dashboard</CustomH1>
//       <TotalReportComp products={products} />
//       <AllMedRep products={products} />
//     </ParentContainer>
//   );
// }

// export default Other;

import React, { useEffect, useState, useRef } from "react";
import {
  getMedicine,
  getMedicineOrder,
  getMedicineOrderWithoutDate,
} from "../api/medicineApi";
import styled from "styled-components";
import TotalReportComp from "../Components/TotalReportComp";
import DatePicker from "react-datepicker";
import AllMedRep from "../Components/AllMedRep";
import { MdDownloadForOffline } from "react-icons/md";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "react-datepicker/dist/react-datepicker.css";

const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
const StyledLink = styled.a`
  color: inherit;
  text-decoration: none;
  &:hover {
    color: #fff;
  }
`;
const CustomH1 = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  color: #28a745;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const DatePickerContainer = styled.div`
  display: flex;
  gap: 2rem; // Adjusts the space between the DatePicker components
  align-items: center; // Centers the components vertically
  margin-bottom: 1rem; // Adds some space below the DatePickerContainer
`;

function Other() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalSellMon, setTotalSellMon] = useState(0);
  const [soldMedCost, setSoldMedCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [medBuy, setMedBuy] = useState(0);
  const [sold, setSold] = useState(0);
  const allMedRepRef = useRef(null);

  useEffect(() => {
    if (!show) {
      const fetchData = async () => {
        try {
          const response = await getMedicineOrderWithoutDate();
          setProducts(response);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchData();
    }
  }, [show]);

  function handleShow() {
    setShow((show) => !show);
  }

  console.log(show);

  const fetchMedicineOrder = async () => {
    if (show) {
      try {
        console.log("get Medicine");

        const response = await getMedicineOrder(
          startDate.toISOString(),
          endDate.toISOString()
        );
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
  };

  console.log(products);

  const handleDownloadPDF = () => {
    html2canvas(allMedRepRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "pt", [canvas.width, 842]); // A4 size in points
      const totalPages = Math.ceil(canvas.height / 842); // Calculate total pages

      // Set text color to black (RGB: 0, 0, 0) before adding text

      for (let i = 0; i < totalPages; i++) {
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const heightLeft = canvas.height - i * 842;
        const position = heightLeft - imgProps.height;

        pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgProps.height);

        if (i < totalPages - 1) {
          pdf.addPage();
        }
      }
      pdf.save("downloaded-file.pdf");
    });
  };

  return (
    <ParentContainer ref={allMedRepRef}>
      <CustomH1>Dashboard</CustomH1>
      <Button2 onClick={handleDownloadPDF}>Download Report</Button2>
      {show && (
        <DatePickerContainer>
          <h3>Put the starting date</h3>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
          <h3>Put the ending date</h3>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </DatePickerContainer>
      )}
      {show && <Button onClick={fetchMedicineOrder}>Show Sell History</Button>}
      <Button3 onClick={handleShow}>
        {show ? "Filter History using date" : "Show Full History"}
      </Button3>
      <TotalReportComp
        products={products}
        setTotalSellMon={setTotalSellMon}
        setSoldMedCost={setSoldMedCost}
        setTotalCost={setTotalCost}
        setMedBuy={setMedBuy}
        setSold={setSold}
      />
      <div ref={allMedRepRef}>
        <AllMedRep products={products} />
      </div>
    </ParentContainer>
  );
}

export default Other;
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

const Button2 = styled.button`
  background: linear-gradient(to right, #ffa500, #ff4500);
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
    background: linear-gradient(to right, #ff4500, #ffa500);
    transform: scale(1.1); // Increase the size by 10%
    box-shadow: 0px 10px 20px 5px rgba(0, 0, 0, 0.5);
  }
`;

const Button3 = styled.button`
  background: linear-gradient(to right, #007bff, #00c6ff);
  color: white;
  border: none;
  padding: 10px 20px;
  width: 18rem;
  height: 3rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 20px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #00c6ff, #007bff);
    transform: scale(1.1); // Increase the size by 10%
    box-shadow: 0px 10px 20px 5px rgba(0, 0, 0, 0.5);
  }
`;
