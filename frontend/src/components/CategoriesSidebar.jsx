import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  useTheme,
  Divider,
} from "@mui/material";

function CategoriesSidebar() {
  const theme = useTheme();

  const categories = [
    { name: "Accessories", image: "/images/sony_wh1000xm5.jpg" },
    { name: "Cameras", image: "/images/gopro_hero12.jpg" },
    { name: "Gaming", image: "/images/razer_blackwidow_v4.jpg" },
    { name: "Headphones", image: "/images/steelseries_arctis_nova7.jpg" },
    { name: "Tablets", image: "/images/ipad_air_m1.jpg" },
    { name: "Phones", image: "/images/elgato_stream_deck.jpg" },
    { name: "Smart Watches", image: "/images/corsair_vengeance_rgb_32gb.jpg" },
    { name: "Speakers", image: "/images/steelseries_arctis_nova7.jpg" },
    { name: "VR Devices", image: "/images/asus_rog_strix_g16.jpg" },
  ];
  
  return (
    <Paper
      elevation={2}
      sx={{
        width: { xs: "100%", md: 240 },
        maxWidth: 240,
        height: "100%",
        p: 2,
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Categories
      </Typography>
      <Divider sx={{ mb: 1.5 }} />

      <List disablePadding>
        {categories.map((cat, i) => (
          <ListItem
            key={i}
            button
            sx={{
              borderRadius: 1,
              mb: 0.5,
              "&:hover": {
                bgcolor:
                  theme.palette.mode === "light"
                    ? "rgba(51,150,211,0.08)"
                    : "rgba(51,150,211,0.15)",
              },
            }}
          >
            <ListItemAvatar>
              <Avatar
                src={cat.image}
                alt={cat.name}
                variant="rounded"
                sx={{ width: 40, height: 40 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={cat.name}
              primaryTypographyProps={{
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default CategoriesSidebar;
