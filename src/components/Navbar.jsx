import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useNavigate } from "react-router-dom";
import { UserInterfaceContext } from "../contexts/UserInterfaceContext";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { getCurrentUser } from "../services/auth";

const Navbar = ({ onLogout }) => {
  const currentUser = getCurrentUser();
  const { isDarkMode, toggleDarkMode } = useContext(UserInterfaceContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          onClick={() => navigate("/")}
          sx={{ display: { xs: "none", sm: "block", cursor: "pointer" } }}
        >
          TISS
        </Typography>

        <Typography>
          <Button color="inherit" onClick={() => navigate("/home")}>
            Home
          </Button>
        </Typography>
        <Typography>
          <Button color="inherit" onClick={() => navigate("/enrolment")}>
            Enrolment
          </Button>
        </Typography>
        <Typography>
          <Button color="inherit" onClick={() => navigate("/grades")}>
            Grades
          </Button>
        </Typography>
        <Typography>
          <Button color="inherit" onClick={() => navigate("/profile")}>
            Profile
          </Button>
        </Typography>

        <Box sx={{ flexGrow: 1, marginLeft: 5 }} />
        <Box sx={{ display: "flex" }}>
          <div>
            {currentUser ? (
              <>
                <Typography
                  component="span"
                  variant="body1"
                  sx={{ marginRight: 2 }}
                >
                  Welcome {currentUser}!
                </Typography>
                <Button color="inherit" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" LinkComponent={Link} to="/login">
                  Login
                </Button>
              </>
            )}
          </div>
          <IconButton color="inherit" onClick={handleMenu}>
            <MoreVertIcon />
          </IconButton>

          <Menu
            sx={{ mt: "45px" }}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuList sx={{ width: 300 }}>
              <MenuItem onClick={() => navigate("/admin/products")}>
                <ListItemIcon>
                  <AdminPanelSettingsOutlinedIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText>Admin</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Brightness4Icon fontSize="medium" />
                </ListItemIcon>
                <ListItemText>
                  Appearance: {isDarkMode ? "Dark" : "Light"}
                </ListItemText>
                <Typography variant="body2" color="text.secondary">
                  <Switch value={isDarkMode} onChange={toggleDarkMode} />
                </Typography>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
