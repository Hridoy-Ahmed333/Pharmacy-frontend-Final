import { useState } from "react";
import LoginForm from "../Components/LoginForm";
import SignUpFrom from "../Components/SignUpFrom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(macro.png);
  background-size: cover;
`;

const FormContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f8ff; // LightSkyBlue
  padding: 20px;
  border-radius: 10px;
  width: 400px;
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
    <Container>
      <FormContainer>
        <div>{!set ? <LoginForm /> : <SignUpFrom setSet={setSet} />}</div>
        <SpanContainer>
          <Span onClick={(e) => setSet(!set)}>
            {set ? "Already Have an Account?" : "Don't have an account?"}
          </Span>
          <Span onClick={handleClick}>Home</Span>
        </SpanContainer>
      </FormContainer>
    </Container>
  );
}

export default Login;
