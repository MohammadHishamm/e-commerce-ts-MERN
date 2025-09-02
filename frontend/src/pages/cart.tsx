import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/auth";
import { BASE_URL } from "../constants/baseURL";

export const Cart = () => {
  const { token } = useAuth();

  const [cart, setCart] = useState();
  const [error, Seterror] = useState(" ");

  useEffect(() => {
    if (!token) {
      return;
    }

    // Fetch cart data from API or local storage
    const fetchCart = async () => {
      const response = await fetch(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        Seterror("failed to load cart");
        return <div>{error}</div>;
      }
      const data = await response.json();
      setCart(data);
    };
    fetchCart();
  }, [token]);
  console.log(cart);
  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4">Your Cart</Typography>
      </Container>
    </>
  );
};
