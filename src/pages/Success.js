import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledDetail = styled.div`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 750;
`;

const Container = styled.div`
  max-width: 80%;
  margin: auto;
  padding: 20px;
`;

const DownloadButton = styled.button`
  background: linear-gradient(to right, #007bff, #00c6ff);
  color: white;
  border: none;
  padding: 10px 20px;
  width: 15rem;
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

const ProductCard = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  padding: 20px;
  width: 18rem; /* Adjust based on your design */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 4rem;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.1); // Increase the size by 10%
    box-shadow: 0px 10px 20px 5px rgba(0, 0, 0, 0.5);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const ProductCardTitle = styled.h2`
  margin-top: 0;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
`;
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Successfull = styled.div`
  font-size: 2rem;
  font-weight: 750;
  margin-bottom: 1rem;
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

function Success() {
  const navigate = useNavigate();
  const storedInvoice = localStorage.getItem("invoice");
  const invoice = JSON.parse(storedInvoice);
  const username = JSON.parse(localStorage.getItem("user")).name;
  const user = JSON.parse(localStorage.getItem("user")).token;

  // State to store fetched products
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productIds = invoice.medicines.map((medicine) => medicine.id);
        const response = await fetch(
          "http://localhost:8080/payment/fetchproducts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user}`,
            },
            body: JSON.stringify({ productIds }),
          }
        );
        const data = await response.json();
        // Set products with fetched data
        setProducts(data.data);

        // Match products with local storage and update inTotal
        const matchedProducts = data.data.map((product) => {
          const localProduct = invoice.medicines.find((medicine) => {
            console.log(medicine.id);
            return medicine.id === product._id;
          });
          if (localProduct) {
            // Return a new object with the updated inTotal value
            return { ...product, inTotal: localProduct.inTotal };
          }
          return product; // Return the original product if no match is found
        });
        // Update state with matched products
        setProducts(matchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts(); // Call the async function to fetch products
  }, []);

  const calculateTotalWithDiscountForAll = (products) => {
    return products.reduce((acc, product) => {
      const priceWithDiscount =
        product.price - (product.price * product.discountPercentage) / 100;
      return acc + priceWithDiscount * product.inTotal;
    }, 0);
  };

  const generateAndDownloadPDF = () => {
    const doc = new jsPDF();
    const totalMedicinePriceWithDiscount =
      calculateTotalWithDiscountForAll(products);

    const tableColumn = ["Field", "Value"];
    const tableData = [
      ["Username", username],
      ["Date", invoice.date],
      ...products.map((product) => [
        `${product.name}`,
        `(${
          product.inTotal
        } pieces, total price with discount: ${calculateTotalWithDiscountForAll(
          [product]
        ).toFixed(2)})`,
      ]),
      ["Total Price with Discount", totalMedicinePriceWithDiscount.toFixed(2)],
    ];

    doc.autoTable({
      head: [tableColumn],
      body: tableData,
      margin: { top: 20 },
      theme: "grid",
      styles: { overflow: "linebreak" },
    });

    doc.save("Invoice.pdf");
  };

  function navigateToHome() {
    navigate("/");
  }

  return (
    <Container>
      <h1>Purchase Details</h1>
      <DownloadButton onClick={generateAndDownloadPDF}>
        Download MEMO
      </DownloadButton>
      <Successfull>You Have Successfully Brought These Medicines</Successfull>
      <ProductContainer>
        {products.map((product, index) => (
          <ProductCard key={index}>
            <ProductImage
              src={`http://localhost:8080/images/${product?.image}`}
              alt="Product"
            />
            <ProductCardTitle>{product.name}</ProductCardTitle>
            <Detail>
              <StyledDetail>Pieces: {product.inTotal}</StyledDetail>
              <StyledDetail>
                Price:{" "}
                {product.price -
                  (product.price * product.discountPercentage) / 100}{" "}
                {` Taka`}
                {`  `}
                (With Discount)
              </StyledDetail>
              <StyledDetail>
                Total Price with Discount:{" "}
                {calculateTotalWithDiscountForAll([product]).toFixed(2)}{" "}
                {` Taka`}
              </StyledDetail>
            </Detail>
          </ProductCard>
        ))}
      </ProductContainer>
      <Button onClick={navigateToHome}>Go Back to Our Page</Button>
    </Container>
  );
}

export default Success;
