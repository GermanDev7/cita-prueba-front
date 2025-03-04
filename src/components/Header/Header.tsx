import { Button, Drawer, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./header.css";
import Sidebar from "../Sidebar/Sidebar";
import { logout } from '../../store/slices/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openProfileOptions = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleDrawer = () => () => {
    setOpen(!open);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <section className="header__container">
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer()}
        edge="start"
      >
        <MenuIcon />
      </IconButton>

      <section>
        <Button
          id="basic-button"
          aria-controls={openProfileOptions ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openProfileOptions ? "true" : undefined}
          onClick={handleClick}
        >
          <AccountCircleIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openProfileOptions}
          onClose={handleClose}
        >
          <MenuItem onClick={() => {
            handleClose();
            handleLogout();
          }}>Cerrar sesión</MenuItem>
        </Menu>
      </section>

      <Drawer
        className="drawer__container"
        open={open}
        onClose={toggleDrawer()}
      >
        <Sidebar />
      </Drawer>
    </section>
  );
};
export default Header;