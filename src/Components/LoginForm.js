import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 401) {
      // Handle 401 Unauthorized specifically
      alert("Invalid username or password.");
      return;
    }

    if (!response.ok) {
      alert("Invalid Email or password");
      return;
    }

    const data = await response.json();
    console.log(data);
    if (data.token) {
      localStorage.setItem("user", JSON.stringify(data));
      if (data?.role === "admin") {
        navigate("/other");
      } else {
        navigate("/");
      }
    } else {
      alert("Wrong password or email");
    }
  };
  return (
    <FormContainer>
      <FormTitle>Login</FormTitle>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel htmlFor="email">Email</StyledLabel>
        <StyledInput
          id="email"
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledLabel htmlFor="password">Password</StyledLabel>
        <StyledInput
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledButton type="submit">Login</StyledButton>
      </StyledForm>
    </FormContainer>
  );
}

export default LoginForm;
