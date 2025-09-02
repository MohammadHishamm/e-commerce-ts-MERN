import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/productcard";
import Grid from "@mui/material/Grid";
import { Typography, Box } from "@mui/material";
import type { Product } from "../types/product";
import Ads from "../components/ads";
import { BASE_URL } from "../constants/baseURL";
import TrueFocus from "../components/TrueFocus";

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product`);
        const data = await response.json();
        setProducts(data);
      } catch {
        setError(true);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        Error fetching products
      </Typography>
    );
  }

  return (
    <>
      <Ads />

      {/* Main Content - Adjusted for ads */}
      <Box
        sx={{
          minHeight: "100vh",
          pt: 4,
          pb: 4,
          pr: "280px", // Reduced gap (300px + 20px margin)
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 2 }}>
          <TrueFocus 
            sentence="Our products"
            manualMode={false}
            blurAmount={5}
            borderColor="red"
            animationDuration={2}
            pauseBetweenAnimations={1}
            
          />
          <Grid container spacing={2} paddingTop={2}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <ProductCard {...product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};
