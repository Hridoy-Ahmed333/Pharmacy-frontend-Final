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
import { getMedicine } from "../api/medicineApi";
import styled from "styled-components";
import TotalReportComp from "../Components/TotalReportComp";
import AllMedRep from "../Components/AllMedRep";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Button = styled.button`
  height: 3rem;
  width: 13rem;
  font-weight: 700;
  font-size: 1rem;
  background-color: rgb(255, 150, 0);
`;

const CustomH1 = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  color: #28a745;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

function Other() {
  const [products, setProducts] = useState([]);
  const [totalSellMon, setTotalSellMon] = useState(0);
  const [soldMedCost, setSoldMedCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [medBuy, setMedBuy] = useState(0);
  const [sold, setSold] = useState(0);
  const allMedRepRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMedicine();
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

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
      pdf.setTextColor(0, 0, 0);

      pdf.setFontSize(18);
      pdf.text("Report", 400, 30);
      pdf.setFontSize(12);
      pdf.text(
        `Total Sell: ${totalSellMon.toFixed(
          2
        )} Taka,       Total Cost of Sold Medicine: ${soldMedCost.toFixed(
          2
        )} Taka,      Total Cost: ${totalCost.toFixed(2)} Taka`,
        50,
        50
      );
      pdf.text(
        `Total Medicine Bought: ${medBuy} Pieces,        Total Medicine Sold: ${sold} Pieces,   ${
          totalSellMon >= soldMedCost
            ? `Total Income: ${(totalSellMon - soldMedCost).toFixed(2)} Taka`
            : `Total Loss: ${(soldMedCost - totalSellMon).toFixed(2)} Taka`
        }`,
        50,
        70
      );
      pdf.save("downloaded-file.pdf");
    });
  };

  return (
    <ParentContainer>
      <CustomH1>Dashboard</CustomH1>
      <Button onClick={handleDownloadPDF}>Download Report</Button>
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
