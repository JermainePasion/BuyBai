import React from "react";
import {
  Paper,
  Typography,
  Divider,
  Box,
  useTheme,
  Stack,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const SidebarItem = ({ image, title }) => (
  <Card
    sx={{
      display: "flex",
      alignItems: "center",
      mb: 1.5,
      boxShadow: 0,
      border: "1px solid #e0e0e0",
      borderRadius: 2,
      cursor: "pointer",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      "&:hover": {
        transform: "scale(1.02)",
        boxShadow: 2,
      },
    }}
  >
    <CardMedia
      component="img"
      image={image}
      alt={title}
      sx={{
        width: 60,
        height: 60,
        objectFit: "cover",
        borderRadius: "8px",
        m: 1,
      }}
    />
    <CardContent sx={{ p: 0 }}>
      <Typography variant="body2" fontWeight="500">
        {title}
      </Typography>
    </CardContent>
  </Card>
);

const RightSidebar = () => {
  const theme = useTheme();

  const recentlyViewed = [
    { image: "/images/asus_rog_strix_g16.jpg", title: "Asus ROG STRIX G16" },
    { image: "/images/samsung_980pro_1tb.jpg", title: "Samsung 980PRO 1tb" },
  ];

  const trendingItems = [
    { image: "/images/razer_blackwidow_v4.jpg", title: "Razer Blackwidow v4" },
    { image: "/images/sony_wh1000xm5.jpg", title: "Sony wh1000XM5" },
  ];

  return (
    <Box
      sx={{
        width: { xs: "85%", md: 250 },
        flexShrink: 0,
        minHeight: "100vh",
        mx: { xs: "auto", md: 0 },
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 2,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Recently Viewed
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={1.5}>
          {recentlyViewed.map((item, index) => (
            <SidebarItem key={index} image={item.image} title={item.title} />
          ))}
        </Stack>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Trending Items
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={1.5}>
          {trendingItems.map((item, index) => (
            <SidebarItem key={index} image={item.image} title={item.title} />
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};

export default RightSidebar;
