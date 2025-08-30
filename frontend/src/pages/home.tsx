
import Container from '@mui/material/Container'
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/productcard'
import Grid from '@mui/material/Grid'
import { Typography, Box } from '@mui/material'
import type { Product } from '../types/product'
import Ads from '../components/ads'

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/product")
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <>
      {/* Ads Component */}
      <Ads />
      
      {/* Main Content - Adjusted for ads */}
      <Box sx={{ 
        minHeight: '100vh',
        pt: 4,
        pb: 4,
        pr: '280px' // Reduced gap (300px + 20px margin)
      }}>
        <Container maxWidth="xl" sx={{ mt: 2 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              color: 'white', 
              textAlign: 'center', 
              mb: 4,
              fontWeight: 300,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}
          >
            Our Products
          </Typography>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <ProductCard
                  id={product._id}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  )
}
