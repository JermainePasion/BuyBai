import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayouts';
import ProductCard from '../componentss/ProductCard';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/products/') // adjust port if needed
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <DashboardLayout>
      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </DashboardLayout>
  );
}

export default HomeScreen;
