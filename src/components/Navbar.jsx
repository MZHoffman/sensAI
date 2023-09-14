import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import Settings from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container
      sx={{
        textAlign: "right",
        borderBottom: 1,
        maxWidth: 11 / 12,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography sx={{ fontSize: 60, fontWeight: "bold" }}><Link to="/" className="navbar-link">sensAI</Link></Typography>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon sx={{ color: "black", fontSize: 40 }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <AssignmentIcon sx={{ mr: 2 }} />
          <Link to="/student/assignments" className="navbar-link">Assignment</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <SchoolIcon sx={{ mr: 2 }} />
          <Link to="/teachers/home" className="navbar-link">Lesson</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Settings sx={{ mr: 2 }} />
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <LogoutIcon sx={{ mr: 2 }} />
          Logout
        </MenuItem>
      </Menu>
    </Container>
  );
};
