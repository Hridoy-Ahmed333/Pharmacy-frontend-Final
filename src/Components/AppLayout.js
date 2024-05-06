import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import Footer from "./Footer";
import { SearchProvider } from "../context/SearchContext";
import UserContext from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import Modal from "./Modal";
import EditComp from "./EditComp";
import { ModalProvider } from "../context/ModalContext";
import { ProductProvider } from "../context/ProductContext";

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Main = styled.main`
  background-color: rgb(245, 255, 250);
  flex-grow: 1;
  padding: 1rem 4.8rem 3.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  gap: 3.2rem;
`;

function AppLayout() {
  const { setCartAmount } = useContext(CartContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setUser({
        name: "unknow",
        _id: 0,
        role: "visitor",
      });
    } else {
      setUser(user);
    }
  }, []);

  useEffect(() => {
    const storedCartAmount = localStorage.getItem("cartAmount");
    if (storedCartAmount) {
      // Parse the stored value back into a number and update the state
      setCartAmount(parseInt(storedCartAmount, 10));
    }
  }, [setCartAmount]);
  const resetUserContext = () => {
    setUser(null);
  };
  return (
    <div>
      <ProductProvider>
        <ModalProvider>
          <StyledAppLayout>
            <UserContext.Provider value={{ user, resetUserContext }}>
              <SearchProvider>
                <Header />
                <Main>
                  <Container>
                    <Outlet />
                  </Container>
                </Main>
                <Footer />
              </SearchProvider>
            </UserContext.Provider>
          </StyledAppLayout>
          <Modal>
            <EditComp />
          </Modal>
        </ModalProvider>
      </ProductProvider>
    </div>
  );
}

export default AppLayout;
