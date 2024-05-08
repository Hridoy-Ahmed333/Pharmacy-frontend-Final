import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { json, useNavigate } from "react-router-dom";
import styled from "styled-components";

const cities = {
  Dhaka: [
    "Upazila: Motijheel, Post Office: Dhaka GPO, Post Code: 1000",
    "Upazila: Dhaka Sadar, Post Office: Dhaka Sadar HO, Post Code: 1100",
    "Upazila: Dhaka Sadr, Post Office: Wari TSO, Post Code: 1203",
    "Upazila: Dhaka Sadar, Post Office: Gandaria TSO, Post Code: 1204",
    "Upazila: Nilkhet, Post Office: New Market TSO, Post Code: 1205",
    "Upazila: Kochukhet, Post Office: Dhaka Cen,ft. TSO, Post Code: 1206",
    "Upazila: Mohammadpur, Post Office: Mohammadpur Housing Estate TSO, Post Code: 1207",
    "Upazila: Kamrangirchar, Post Office: Posta TSO, Post Code: 1211",
    "Upazila: Tejgaon, Post Office: Dhaka Politechnique Institut TSO, Post Code: 1208",
    "Upazila: Dhanmondi, Post Office: Jigatola TSO, Post Code: 1209",
    "Upazila: Gulshan, Post Office: Gulshan TSO, Post Code: 1212",
    "Upazila: Banani, Post Office: Banani TSO, Post Code: 1213",
    "Upazila: Khilgaon, Post Office: Bashabo TSO, Post Code: 1214",
    "Upazila: Tejgaon, Post Office: Tejgaon TSO, Post Code: 1215",
    "Upazila: Mirpur, Post Office: Mirpur TSO, Post Code: 1216",
    "Upazila: Shantinagar, Post Office: Shantinagar TSO, Post Code: 1217",
    "Upazila: Mohammadpur, Post Office: Bangabhaban TSO, Post Code: 1222",
    "Upazila: Motijheel, Post Office: Dilkusha TSO, Post Code: 1223",
    "Upazila: Lalmati, Post Office: Sangshad Bhaban, Post Code: 1225",
    "Upazila: Khilkhet, Post Office: Khilkhet TSO, Post Code: 1229",
    "Upazila: Uttara, Post Office: Uttara Model Town TSO, Post Code: 1230",
    "Upazila: Keranigonj, Post Office: Keranigonj UPO, Post Code: 1310",
    "Upazila: Keranigonj, Post Office: Dhaka Jute Mils SO, Post Code: 1311",
    "Upazila: Keranigonj, Post Office: Ati EDSO, Post Code: 1312",
    "Upazila: Keranigonj, Post Office: Kalatia SO, Post Code: 1313",
    "Upazila: Nawabgonj, Post Office: Nawabgonj UPO, Post Code: 1320",
    "Upazila: Nawabgonj, Post Office: Hasnabad SO, Post Code: 1321",
    "Upazila: Nawabgonj, Post Office: Daudpur So, Post Code: 1322",
    "Upazila: Nawabgonj, Post Office: Agla EDSO, Post Code: 1323",
    "Upazila: Nawabgonj, Post Office: Khalpur EDSO, Post Code: 1324",
    "Upazila: Nawabgonj, Post Office: Churan So, Post Code: 1325",
    "Upazila: Joypara (Dohar), Post Office: Joypara (Dohar) UPO, Post Code: 1330",
    "Upazila: Joypara (Dohar), Post Office: Palamgonj SO, Post Code: 1331",
    "Upazila: Joypara (Dohar), Post Office: Narisha SO, Post Code: 1332",
    "Upazila: Joypara (Dohar), Post Office: Mokshedpur So, Post Code: 1333",
    "Upazila: Savar, Post Office: Savar UPO, Post Code: 1340",
    "Upazila: Savar, Post Office: Dairy Firm SO, Post Code: 1341",
    "Upazila: Savar, Post Office: Jahangir Nagar University SO, Post Code: 1342",
    "Upazila: Savar, Post Office: Savar PATC  SO, Post Code: 1343",
    "Upazila: Savar, Post Office: Savar Cantt. SO, Post Code: 1344",
    "Upazila: Savar, Post Office: Shimulia SO, Post Code: 1345",
    "Upazila: Savar, Post Office: Kashem Cotton Mills SO, Post Code: 1346",
    "Upazila: Savar, Post Office: Rajfulbaria EDSO, Post Code: 1347",
    "Upazila: Savar, Post Office: Amin Bazar, Post Code: 1348",
    "Upazila: Savar, Post Office: EPZ SO, Post Code: 1349",
    "Upazila: Dhamrai, Post Office: Dhamrai UPO, Post Code: 1350",
    "Upazila: Dhamrai, Post Office: Kalampur EDSO, Post Code: 1351",
    "Upazila: Demra, Post Office: Demra UPO, Post Code: 1360",
    "Upazila: Demra, Post Office: Sarulia SO, Post Code: 1361",
    "Upazila: Kodomtoli, Post Office: Kodomtoli UPO, Post Code: 1362",
  ],

  Gazipur: [
    "Upazila: Gazipur, Post Office: Gazipur HO, Post Code: 1700",
    "Upazila: Gazipur, Post Office: BRRI SO, Post Code: 1701",
    "Upazila: Gazipur, Post Office: Chandana EDSO, Post Code: 1702",
    "Upazila: Gazipur, Post Office: Jatiya Bishwa Bidyalay SO, Post Code: 1703",
    "Upazila: Gazipur, Post Office: Ipsha SO, Post Code: 1706",
    "Upazila: Monnonagar, Post Office: Monnonagar UPO, Post Code: 1710",
    "Upazila: Monnonagar, Post Office: Nishatnagar SO, Post Code: 1711",
    "Upazila: Monnonagar, Post Office: Ershadnagar, Post Code: 1712",
    "Upazila: Kaligonj, Post Office: Kaligonj UPO, Post Code: 1720",
    "Upazila: Kaligonj, Post Office: Pubali EDSO, Post Code: 1721",
    "Upazila: Kaligonj, Post Office: Santan Para EDSO, Post Code: 1722",
    "Upazila: Kaligonj, Post Office: Bhawal Jamalpur EDSO, Post Code: 1723",
    "Upazila: Kapasia, Post Office: Kapasia UPO, Post Code: 1730",
    "Upazila: Sreepur, Post Office: Sreepur UPO, Post Code: 1740",
    "Upazila: Sreepur, Post Office: Rajendrapur EDSO, Post Code: 1741",
    "Upazila: Sreepur, Post Office: Rajendrapur Cantt. SO, Post Code: 1742",
    "Upazila: Sreepur, Post Office: Barmi SO, Post Code: 1743",
    "Upazila: Sreepur, Post Office: Satkhamar EDSO, Post Code: 1744",
    "Upazila: Sreepur, Post Office: Karodi SO, Post Code: 1745",
    "Upazila: Sreepur, Post Office: Bashmur Krishi So, Post Code: 1747",
    "Upazila: Sreepur, Post Office: Bangladesh Open Uni. SO, Post Code: 1748",
    "Upazila: Kaliakair, Post Office: Kaliakair UPO, Post Code: 1750",
    "Upazila: Kaliakair, Post Office: Shafiqur A TC, Post Code: 1751",
  ],
  Narayangonj: [
    "Upazila: Sadar, Post Office: Narayangonj HO, Post Code: 1400",
    "Upazila: Bandar, Post Office: Bandar UPO, Post Code: 1410",
    "Upazila: Bandar, Post Office: DC Mills SO, Post Code: 1411",
    "Upazila: Bandar, Post Office: Nabigonj EDSO, Post Code: 1412",
    "Upazila: Bandar, Post Office: BIDC SO, Post Code: 1413",
    "Upazila: Bandar, Post Office: Madangonj SO, Post Code: 1414",
    "Upazila: Fatulla, Post Office: Fatulla UPO, Post Code: 1420",
    "Upazila: Fatulla, Post Office: Fatulla Bazar SO, Post Code: 1421",
    "Upazila: Siddirgonj, Post Office: Siddirgonj Power Station UPO, Post Code: 1430",
    "Upazila: Siddirgonj, Post Office: Adamjeenagar SO, Post Code: 1431",
    "Upazila: Siddirgonj, Post Office: LN Mills SO, Post Code: 1432",
    "Upazila: Sonargaon, Post Office: Sonargaon UPO, Post Code: 1440",
    "Upazila: Sonargaon, Post Office: Bara Nagar EDSO, Post Code: 1441",
    "Upazila: Sonargaon, Post Office: Bradi SO, Post Code: 1442",
    "Upazila: Arhaihazar, Post Office: Arhaihazar UPO, Post Code: 1450",
    "Upazila: Arhaihazar, Post Office: Gopadi SO, Post Code: 1451",
    "Upazila: Rupgonj, Post Office: Rupgonj UPO, Post Code: 1460",
    "Upazila: Rupgonj, Post Office: Kanchen SO, Post Code: 1461",
    "Upazila: Rupgonj, Post Office: Bhulta SO, Post Code: 1462",
    "Upazila: Rupgonj, Post Office: Nagari EDSO, Post Code: 1463",
    "Upazila: Rupgonj, Post Office: Murapara SO, Post Code: 1464",
  ],
  Narsingdi: [
    "Upazila: Sadar, Post Office: Narsingdi HO, Post Code: 1600",
    "Upazila: Sadar, Post Office: UMC Jute Mills SO, Post Code: 1601",
    "Upazila: Sadar, Post Office: Narsingdi College EDSO, Post Code: 1602",
    "Upazila: Sadar, Post Office: Panchdona SO, Post Code: 1603",
    "Upazila: Sadar, Post Office: Madhabdi SO, Post Code: 1604",
    "Upazila: Sadar, Post Office: Karimpur EDSO, Post Code: 1605",
    "Upazila: Palash, Post Office: Palash UPO, Post Code: 1610",
    "Upazila: Palash, Post Office: Ghorasal UF SO, Post Code: 1611",
    "Upazila: Palash, Post Office: Charsindur EDSO, Post Code: 1612",
    "Upazila: Palash, Post Office: Ghorasal SO, Post Code: 1613",
    "Upazila: Shibpur, Post Office: Shibpur UPO, Post Code: 1620",
    "Upazila: Raypura, Post Office: Raypura UPO, Post Code: 1630",
    "Upazila: Raypura, Post Office: Bazar Hasnabad EDSO, Post Code: 1631",
    "Upazila: Raypura, Post Office: Radhagonj Bazar EDSO, Post Code: 1632",
    "Upazila: Belabo, Post Office: Belabo UPO, Post Code: 1640",
    "Upazila: Monohardi, Post Office: Monohardi UPO, Post Code: 1650",
    "Upazila: Monohardi, Post Office: Hatirdia SO, Post Code: 1651",
    "Upazila: Monohardi, Post Office: Katabaria SO, Post Code: 1652",
  ],
  Tangail: [
    "Upazila: Sadar, Post Office: Tangail HO, Post Code: 1900",
    "Upazila: Sadar, Post Office: Kagmari EDSO, Post Code: 1901",
    "Upazila: Sadar, Post Office: Sontosh SO, Post Code: 1902",
    "Upazila: Sadar, Post Office: Karatia SO, Post Code: 1903",
    "Upazila: Sadar, Post Office: Purabari EDSO, Post Code: 1904",
    "Upazila: Deldoar, Post Office: Deldoar UPO, Post Code: 1910",
    "Upazila: Deldoar, Post Office: Jangalia SO, Post Code: 1911",
    "Upazila: Deldoar, Post Office: Patharia EDSO, Post Code: 1912",
    "Upazila: Deldoar, Post Office: Elasin SO, Post Code: 1913",
    "Upazila: Deldoar, Post Office: Hinganagar EDSO, Post Code: 1914",
    "Upazila: Deldoar, Post Office: Lahati EDSO, Post Code: 1915",
    "Upazila: Basail, Post Office: Basail UPO, Post Code: 1920",
    "Upazila: Khas Kaolia, Post Office: Khas Kaolia UPO (Chowhali thana at Serajgonj District), Post Code: 1921",
    "Upazila: Nagarpur, Post Office: Nagarpur UPO, Post Code: 1936",
    "Upazila: Nagarpur, Post Office: Doboria SO, Post Code: 1937",
    "Upazila: Nagarpur, Post Office: Salimabad EDSO, Post Code: 1938",
    "Upazila: Mirzapur, Post Office: Mirzapur UPO, Post Code: 1940",
    "Upazila: Mirzapur, Post Office: Gurhai SO, Post Code: 1941",
    "Upazila: Mirzapur, Post Office: MC College EDSO, Post Code: 1942",
    "Upazila: Mirzapur, Post Office: Warshi Paikpara SO, Post Code: 1943",
    "Upazila: Mirzapur, Post Office: Jamurkhi SO, Post Code: 1944",
    "Upazila: Mirzapur, Post Office: Mahera SO, Post Code: 1945",
    "Upazila: Shakhipur, Post Office: Shakhipur UPO, Post Code: 1950",
    "Upazila: Shakhipur, Post Office: Kachua EDSO, Post Code: 1951",
    "Upazila: Bhuapur, Post Office: Bhuapur UPO, Post Code: 1960",
    "Upazila: Kalihati, Post Office: Kalihati UPO, Post Code: 1970",
    "Upazila: Kalihati, Post Office: Rajakair EDSO, Post Code: 1971",
    "Upazila: Kalihati, Post Office: Nagbari EDSO, Post Code: 1972",
    "Upazila: Kalihati, Post Office: Balla Bazar SO, Post Code: 1973",
    "Upazila: Kalihati, Post Office: Alega SO, Post Code: 1974",
    "Upazila: Kalihati, Post Office: Palisha EDSO, Post Code: 1975",
    "Upazila: Kalihati, Post Office: Nagorbari SO, Post Code: 1977",
    "Upazila: Ghatail, Post Office: Ghatail UPO, Post Code: 1980",
    "Upazila: Ghatail, Post Office: Jahingonj EDSO, Post Code: 1981",
    "Upazila: Ghatail, Post Office: D. Pakutia EDSO, Post Code: 1982",
    "Upazila: Ghatail, Post Office: Dhalapara SO, Post Code: 1983",
    "Upazila: Ghatail, Post Office: LS Dighi SO, Post Code: 1984",
    "Upazila: Gopalpur, Post Office: Gopalpur UPO, Post Code: 1990",
    "Upazila: Gopalpur, Post Office: Jhaoali So, Post Code: 1991",
    "Upazila: Gopalpur, Post Office: Hemnagar SO, Post Code: 1992",
    "Upazila: Madhupur, Post Office: Madhupur UPO, Post Code: 1996",
    "Upazila: Madhupur, Post Office: Dhanbari EDSO, Post Code: 1997",
  ],
};

const DropdownContainer = styled.div`
  display: flex;
  justify-content: flex-start; // Align items at the start
  align-items: center;
  gap: 10px; // Adjust the gap between the dropdowns
`;

const StyledSelect = styled.select`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  width: 150px; // Adjust the width as needed
  margin-right: 2rem; // Add a right margin to the second dropdown
`;

const StyledSelect2 = styled.select`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  width: 550px; // Adjust the width as needed
  margin-right: 2rem; // Add a right margin to the second dropdown
`;

const DropdownLabel = styled.label`
  font-weight: bold;
  margin-right: 5px; // Add some space between the label and the dropdown
`;

const StyledLabel = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const StyledArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 5rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center; /* Optional: Center items vertically */
  gap: 10px; /* Optional: Adds space between items */
`;

const MedicineItem = styled.div`
  background-color: #d4edda; /* Light green */
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #155724; /* Dark green text */
  font-weight: bold;
  text-align: center;
`;

const TotalItems = styled.div`
  background-color: #fff3cd; /* Light orange */
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #856404; /* Dark orange text */
  font-weight: bold;
  text-align: center;
`;

const TotalCosts = styled.div`
  background-color: #ffdab9; /* Light orange */
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #856404; /* Dark orange text */
  font-weight: bold;
  text-align: center;
`;
const GreenText = styled.h2`
  color: green;
`;

const RedText = styled.h2`
  color: red;
`;

const Box = styled.div`
  width: 0.7rem;
  height: 0.7rem;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Tick = styled.span`
  font-size: 24px;
  color: green;
`;
const Text = styled.div`
  font-size: 1rem;
  font-weight: 700;
  justify-content: center;
  align-items: center;
`;

const BoxContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const MethodContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div``;
const Button = styled.button`
  height: 2.5rem;
  width: 8rem;
  font-size: 1rem;
  font-weight: 700;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, height 0.3s ease, width 0.3s ease,
    font-size 0.3s ease, font-width 0.3s ease;

  &:hover {
    background-color: #45a049;
    height: 3rem;
    width: 11rem;
    font-size: 1.2rem;
    font-weight: 800;
  }
`;

function Checkout() {
  const navigate = useNavigate();
  const [orderMed, setOrderMed] = useState(null);
  const [isTickVisible, setTickVisible] = useState(false);
  const [isTickVisible2, setTickVisible2] = useState(false);
  const [address, setAddress] = useState("");

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [citiesDropdown, setCitiesDropdown] = useState([]);
  const [areasDropdown, setAreasDropdown] = useState([]);

  const { cart, setCart, setCartAmount } = useContext(CartContext);

  useEffect(() => {
    if (selectedCity) {
      setAreasDropdown(cities[selectedCity]);
    }
  }, [selectedCity]);

  //console.log(cart.length > 0 ? cart[0].total : 0);
  const orders = JSON.parse(localStorage.getItem("order"));
  const user = JSON.parse(localStorage.getItem("user")).token;
  const medId = orders?.OrderItemDetails?.map((el) => {
    return { id: el.id, total: el.inTotal };
  });
  //console.log(medId);
  //console.log(user);
  const item = orders?.OrderItemDetails?.map((el, index) => {
    return { _id: el.id, inTotal: el.inTotal };
  });

  const updateUser = async () => {
    console.log("Requesting");
    try {
      const res = await fetch("http://localhost:8080/payment/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({
          medicineId: medId,
          userToken: user,
        }),
      });
      const data = await res.json();
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMedicine = async () => {
    console.log("updateMedicine");
    try {
      const res = await fetch("http://localhost:8080/payment/medicine", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({
          medicine: medId,
        }),
      });
      const data = await res.json();
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const order = async () => {
    const newAddress = `${selectedCity}, ${selectedArea}, ${address}`;
    try {
      const res = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({
          order: orders,
          user: user,
          address: newAddress,
        }),
      });
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const checkoutCart = async () => {
    try {
      const res = await fetch("http://localhost:8080/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        mode: "cors",
        body: JSON.stringify({
          items: item,
          userToken: user,
        }),
      });
      const data = await res.json();
      if (data.message === "ok") {
        console.log("Everything is OKDOKI");
        window.location = data.url;
        await updateUser();
        await updateMedicine();
        const orderResponse = await order();
        console.log(orderResponse);

        const orderExist = localStorage.getItem("invoice");
        if (orderExist) {
          localStorage.removeItem("invoice");
        }
        const orderString = JSON.stringify(orderResponse);
        localStorage.setItem("invoice", orderString);
        localStorage.removeItem("cart");
        localStorage.removeItem("cartAmount");
        localStorage.removeItem("order");
        setCartAmount(0);
        setCart({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function handeleOrder() {
    await updateUser();
    await updateMedicine();
    const orderResponse = await order();
    console.log(orderResponse);

    const orderExist = localStorage.getItem("invoice");
    if (orderExist) {
      localStorage.removeItem("invoice");
    }
    const orderString = JSON.stringify(orderResponse);
    localStorage.setItem("invoice", orderString);
    localStorage.removeItem("cart");
    localStorage.removeItem("cartAmount");
    localStorage.removeItem("order");
    setCartAmount(0);
    setCart({});
    navigate("/success");
  }

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = JSON.parse(localStorage.getItem("order"));
      const orderIds = orders?.OrderItemDetails?.map((el) => el.id);
      try {
        const response = await fetch("http://localhost:8080/orders/getOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
          },
          body: JSON.stringify({ orderIds }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setOrderMed(data);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    fetchOrders();
  }, [user]); // Depend on orderIds to refetch when it changes

  console.log(orderMed);

  if (orders?.length === 0) {
    return <div>Loading...</div>;
  }

  const ordersName = orders?.OrderItemDetails?.map((el) => {
    return `${el?.name}  x${el.inTotal}`;
  });

  const joinedName = ordersName?.join(", ");
  const handleClick1 = () => {
    setTickVisible(!isTickVisible);
    if (isTickVisible2 === true) {
      setTickVisible2(false);
    }
  };
  const handleClick2 = () => {
    setTickVisible2(!isTickVisible2);
    if (isTickVisible === true) {
      setTickVisible(false);
    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setCitiesDropdown(cities[event.target.value]);
    setAreasDropdown([]); // Clear areas dropdown
  };

  // Function to handle area selection
  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
  };

  // Update areas dropdown based on selected city

  return (
    <div>
      <h1>Give Your Address</h1>
      <DropdownContainer>
        <DropdownLabel htmlFor="city">Select District</DropdownLabel>
        <StyledSelect
          id="city"
          value={selectedCity}
          onChange={handleCityChange}
        >
          <option value="">Select a city</option>
          {Object.keys(cities).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </StyledSelect>

        {selectedCity && (
          <>
            <DropdownLabel htmlFor="area">Select Area:</DropdownLabel>
            <StyledSelect2
              id="area"
              value={selectedArea}
              onChange={handleAreaChange}
            >
              <option value="">Select an area</option>
              {areasDropdown.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </StyledSelect2>
          </>
        )}
      </DropdownContainer>
      <StyledForm>
        <StyledLabel htmlFor="address">Address</StyledLabel>
        <StyledArea
          id="address"
          name="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </StyledForm>
      <FlexContainer>
        <h2>Order Details</h2>
        <MedicineItem>Medicines: {joinedName}</MedicineItem>
        <TotalItems>Total Items: {orders?.totalItem}</TotalItems>
        <TotalCosts>Total Costs: {orders?.totalValue} Taka</TotalCosts>
        {address ? (
          <GreenText>Choose Payment Method</GreenText>
        ) : (
          <RedText>To Order First Give Receiver's Address</RedText>
        )}
        {address ? (
          <MethodContainer>
            <BoxContainer>
              <Box onClick={handleClick1}>
                <Tick>{isTickVisible ? "✔" : ""}</Tick>
              </Box>
              <Text>Cash on Delivery</Text>
            </BoxContainer>
            <BoxContainer>
              <Box onClick={handleClick2}>
                <Tick>{isTickVisible2 ? "✔" : ""}</Tick>
              </Box>
              <Text>Pay With Your Card</Text>
            </BoxContainer>
          </MethodContainer>
        ) : (
          ""
        )}
      </FlexContainer>
      {address ? (
        <ButtonContainer>
          {isTickVisible2 && <Button onClick={checkoutCart}>Checkout</Button>}
          {isTickVisible && <Button onClick={handeleOrder}>Order</Button>}
        </ButtonContainer>
      ) : (
        ""
      )}
    </div>
  );
}

export default Checkout;
