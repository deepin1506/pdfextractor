import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const TopNav = ({ onUpload }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
          <CloudUploadIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          PDF Extractor
        </Typography>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload files
          <VisuallyHiddenInput type="file" onChange={onUpload} multiple />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
