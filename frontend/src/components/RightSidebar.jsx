import React from "react";
import { Paper, Typography, Divider, Box, useTheme } from "@mui/material";

const RightSidebar = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: { xs: "85%", md: 250 }, // full width on mobile, fixed on desktop
        flexShrink: 0,
        minHeight: "100vh",          // full viewport height
        mx: { xs: "auto", md: 0 },   // center on mobile
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 2,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: 2,
          height: "100%",           // fill parent height
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Recently Viewed
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" mb={2}>
          Product Placeholder
        </Typography>

        <Typography variant="h6" gutterBottom>
          Trending Item
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2">Product Placeholder</Typography>
      </Paper>
    </Box>
  );
};

export default RightSidebar;
