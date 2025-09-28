import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Box,
  Container,
} from "@mui/material";

function ProductScreen() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h6">Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Card sx={{ p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              sx={{
                width: "100%",
                maxHeight: 500,
                objectFit: "contain",
              }}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <Typography variant="h5" gutterBottom>
                {product.name}
              </Typography>

              <Typography variant="body1" color="text.secondary" gutterBottom>
                Stock: {product.quantity}
              </Typography>

              <Box sx={{ flexGrow: 1 }} /> 

              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Add to Cart
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default ProductScreen;
