import { useEffect, useState } from "react";
import { fetchUsers } from "../api/userApi";
import UserInfo from "../Components/UserInfo";
import UsersOrder from "../Components/UsersOrder";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

function UserOrder() {
  const [user, setUser] = useState({});
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUsers();
        setUser(response?.user);
        setOrder(response?.orders);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <UserInfo user={user} />
      <UsersOrder order={order} setOrder={setOrder} />
    </Container>
  );
}

export default UserOrder;
