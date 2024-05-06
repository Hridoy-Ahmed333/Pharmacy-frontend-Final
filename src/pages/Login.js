import { useState } from "react";
import LoginForm from "../Components/LoginForm";
import SignUpFrom from "../Components/SignUpFrom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f8ff; // LightSkyBlue
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  margin: 100px auto;
`;

const SpanContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const Span = styled.div`
  cursor: pointer;
  font-weight: 750;
  color: green;
`;

function Login() {
  const [set, setSet] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <FormContainer>
      <div>{!set ? <LoginForm /> : <SignUpFrom setSet={setSet} />}</div>
      <SpanContainer>
        <Span onClick={(e) => setSet(!set)}>
          {set ? "Already Have an Account?" : "Don't have an account?"}
        </Span>
        <Span onClick={handleClick}>Home</Span>
      </SpanContainer>
    </FormContainer>
  );
}

export default Login;
