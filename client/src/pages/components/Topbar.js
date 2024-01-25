import React, { useState } from "react";
import {
  Box,
  IconButton,
  useTheme,
  Popover,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [logoutBoxOpen, setLogoutBoxOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePersonIconClick = (event) => {
    setAnchorEl(event.currentTarget);
    setLogoutBoxOpen(!logoutBoxOpen);
  };

  const handleLogout = () => {
		// LOGOUT LOGIC MUST BE HANDLED HERE
		console.log("Logging out...");
  };

  const handleCloseLogoutBox = () => {
    setAnchorEl(null);
    setLogoutBoxOpen(false);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        {
        /* <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */
        }
        <IconButton onClick={handlePersonIconClick}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>

      {/* Logout Box */}
      <Popover
        open={logoutBoxOpen}
        anchorEl={anchorEl}
        onClose={handleCloseLogoutBox}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box p={2}>
          <Typography onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logout
          </Typography>
        </Box>
      </Popover>
    </Box>
  );
};

export default Topbar;
