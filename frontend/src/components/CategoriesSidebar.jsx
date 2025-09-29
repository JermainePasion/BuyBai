import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Divider,
  Box,
} from "@mui/material";

function CategoriesSidebar() {
  const theme = useTheme();
  const categories = Array.from({ length: 9 }).map((_, i) => `Category ${i + 1}`);

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
      <Divider />
      <List>
        {categories.map((cat, i) => (
          <ListItem
            key={i}
            button
            sx={{
              "&:hover": { color: theme.palette.primary.main },
            }}
          >
            <ListItemText primary={cat} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default CategoriesSidebar;
