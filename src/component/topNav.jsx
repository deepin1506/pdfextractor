import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HomeIcon from "@mui/icons-material/Home";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { LogoPG } from "./image/logo-TF.png";

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
        <IconButton color="inherit" aria-label="home">
          <HomeIcon />
        </IconButton>
        PDF Extractor
        {/* <img src="https://www.mama.co.th/en/images/logo-TF.png" alt="logo" style={{ height: 40,background: 'white', marginRight: 16 }} /> */}
        <Box sx={{ flexGrow: 1 }} />
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
