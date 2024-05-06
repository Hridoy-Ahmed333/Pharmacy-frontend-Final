import React, { useRef, useState } from "react";
import styled from "styled-components";
import { addUser } from "../api/userApi";

// Define styled components
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f8ff; // LightSkyBlue
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  margin: 0 auto;
`;

const FormTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #006400; // DarkGreen
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledLabel = styled.label`
  font-size: 16px;
  color: #006400; // DarkGreen
  margin-bottom: 5px;
`;

const StyledInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #006400; // DarkGreen
  border-radius: 5px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #008000; // Green
  color: white;
  height: 2.5rem;
  margin: 0 auto;
  width: 10rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #006400; // DarkGreen
  }
`;
const StyledError = styled.span`
  color: red;
  font-size: 0.8rem;
`;

function SignUpFrom({ setSet }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInput = useRef(null);

  function handleImageChange(e) {
    setImage(e.target.files[0]);
  }
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setValues((preVal) => ({ ...preVal, [name]: value }));
  }
  function validate() {
    const tempErrors = {};
    if (!values.name) {
      tempErrors.name = "Name is required";
    }
    if (!values.email) {
      tempErrors.email = "Email is required";
    }
    if (!values.password) {
      tempErrors.password = "Password is required";
    }
    if (!values.mobileNumber) {
      tempErrors.mobileNumber = "Mobile number is required";
    }
    if (!image) tempErrors.image = "Image is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    validate();
    const formData = new FormData();
    formData.append("image", image);
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    if (
      values.name &&
      values.email &&
      values.password &&
      values.mobileNumber &&
      image
    ) {
      const res = await addUser(formData);
      console.log(res);
      alert("Registration Successfull");
      setSet((set) => !set);
    } else {
      alert("Fill the form correctly");
    }
    setValues({
      name: "",
      email: "",
      password: "",
      mobileNumber: "",
    });
    if (fileInput.current) {
      fileInput.current.value = "";
    }
    setImage(null);
  }

  return (
    <FormContainer>
      <FormTitle>Sign Up</FormTitle>
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
        <StyledLabel htmlFor="email">Email</StyledLabel>
        <StyledInput
          id="email"
          name="email"
          type="text"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <StyledError>{errors.email}</StyledError>}
        <StyledLabel htmlFor="password">Password</StyledLabel>
        <StyledInput
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <StyledError>{errors.password}</StyledError>}
        <StyledLabel htmlFor="mobileNumber">Mobile Number</StyledLabel>
        <StyledInput
          id="mobileNumber"
          name="mobileNumber"
          type="text"
          value={values.mobileNumber}
          onChange={handleChange}
        />
        {errors.mobileNumber && (
          <StyledError>{errors.mobileNumber}</StyledError>
        )}
        <StyledLabel htmlFor="image">Image URL</StyledLabel>
        <StyledInput
          id="image"
          name="image"
          type="file"
          ref={fileInput}
          onChange={handleImageChange}
        />
        {errors.image && <StyledError>{errors.image}</StyledError>}
        <StyledButton type="submit">Sign up</StyledButton>
      </StyledForm>
    </FormContainer>
  );
}

export default SignUpFrom;
