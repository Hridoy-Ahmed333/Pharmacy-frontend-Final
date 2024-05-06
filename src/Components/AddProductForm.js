import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getCategories } from "../api/categoryApi";
import { addMedicine } from "../api/medicineApi";

// Define styled components for form elements
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledLabel = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 20rem;
`;

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  height: 2.5rem;
  width: 8rem;
  margin: 0 auto;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const StyledError = styled.span`
  color: red;
  font-size: 0.8rem;
`;

const AddProductForm = ({ isCatAdd }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    discountPercentage: "",
    brand: "",
    category: "",
    buyingPrice: "",
  });
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchData();
  }, [isCatAdd]);

  const [errors, setErrors] = useState({});

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!values.name) tempErrors.name = "Name is required";
    if (!values.price || values.price < 0)
      tempErrors.price = "Price must be greater than or equal to  0";
    if (values.discountPercentage < 0 || values.discountPercentage > 100) {
      tempErrors.discountPercentage = "Discount must be between  0 and  100";
    }
    if (!values.brand) tempErrors.brand = "Brand is required";
    if (!values.category) tempErrors.category = "Category is required";
    if (!values.buyingPrice)
      tempErrors.buyingPrice = " Buying Price is Required";
    if (!image) tempErrors.image = "Image is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    validate();
    const formData = new FormData();
    formData.append("image", image);
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    if (
      values.name &&
      values.description &&
      values.price &&
      values.brand &&
      values.category &&
      values.buyingPrice &&
      image
    ) {
      const res = await addMedicine(formData);
      alert(res.message);
    } else {
      alert("Medicine cannot be added");
    }

    setValues({
      name: "",
      description: "",
      price: "",
      discountPercentage: "",
      brand: "",
      category: "",
      buyingPrice: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImage(null);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel htmlFor="name">Name</StyledLabel>
      <StyledInput
        id="name"
        name="name"
        type="text"
        value={values.name}
        onChange={handleChange}
      />
      {errors.name && <StyledError>{errors.name}</StyledError>}

      <StyledLabel htmlFor="description">Description</StyledLabel>
      <StyledArea
        id="description"
        name="description"
        type="text"
        value={values.description}
        onChange={handleChange}
      />
      <StyledLabel htmlFor="category">Category</StyledLabel>
      <StyledSelect
        id="category"
        name="category"
        value={values.category || ""}
        onChange={handleChange}
      >
        <option value=""> --- Select a Category --- </option>
        {categories.map((category) => (
          <option key={category._id} value={category.category}>
            {category.category}
          </option>
        ))}
      </StyledSelect>
      {errors.category && <StyledError>{errors.category}</StyledError>}

      <StyledLabel htmlFor="price">Price</StyledLabel>
      <StyledInput
        id="price"
        name="price"
        type="number"
        min="0"
        value={values.price}
        onChange={handleChange}
      />
      {errors.price && <StyledError>{errors.price}</StyledError>}

      <StyledLabel htmlFor="buyingPrice">Set Buying Price</StyledLabel>
      <StyledInput
        id="buyingPrice"
        name="buyingPrice"
        type="number"
        min="0"
        value={values.buyingPrice}
        onChange={handleChange}
      />
      {errors.buyingPrice && <StyledError>{errors.buyingPrice}</StyledError>}

      <StyledLabel htmlFor="discountPercentage">
        Discount Percentage
      </StyledLabel>
      <StyledInput
        id="discountPercentage"
        name="discountPercentage"
        type="number"
        min="0"
        max="100"
        value={values.discountPercentage}
        onChange={handleChange}
      />
      {errors.discountPercentage && (
        <StyledError>{errors.discountPercentage}</StyledError>
      )}

      <StyledLabel htmlFor="brand">Brand</StyledLabel>
      <StyledInput
        id="brand"
        name="brand"
        type="text"
        value={values.brand}
        onChange={handleChange}
      />
      {errors.brand && <StyledError>{errors.brand}</StyledError>}

      <StyledLabel htmlFor="image">Image URL</StyledLabel>
      <StyledInput
        id="image"
        name="image"
        type="file"
        ref={fileInputRef}
        value={values.image}
        onChange={handleImageChange}
      />
      {errors.image && <StyledError>{errors.image}</StyledError>}

      <StyledButton type="submit">Submit</StyledButton>
    </StyledForm>
  );
};

export default AddProductForm;
