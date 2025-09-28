import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayouts';
import ProductCard from '../components/ProductCard';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

function HomeScreen({ searchTerm }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/products/')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  // ✅ Filter products by searchTerm
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                <ProductCard product={product} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <p style={{ textAlign: 'center', color: 'gray' }}>
                No products found.
              </p>
            </Grid>
          )}
        </Grid>
      </Container>
    </DashboardLayout>
  );
}

export default HomeScreen;
