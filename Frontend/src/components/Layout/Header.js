import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Logo from '../../images/logo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../styles/HeaderStyles.css';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [initial, setInitial] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const quantities = useSelector((state) => state.cart.quantities);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('firstName');
    if (storedUsername) {
      setInitial(storedUsername.charAt(0).toUpperCase());
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('firstName');
    navigate('/signin');
  };

  const handleCartClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
        color={"goldenrod"}
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, my: 2 }}
      >
        <img src={Logo} alt="logo" height={"70"} width="200" />
      </Typography>
      <Divider />
      <ul className="mobile-navigation">
        <li>
          <NavLink activeClassName="active" to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/menu"}>Menu</NavLink>
        </li>
        <li>
          <NavLink to={"/about"}>About</NavLink>
        </li>
        <li>
          <NavLink to={"/contact"}>Contact</NavLink>
        </li>
        <li>
          <ShoppingCartIcon
            sx={{ color: 'black', cursor: 'pointer', fontSize: '1.8rem' }}
            onClick={handleCartClick}
          />
        </li>
        {initial && (
          <li>
            <Avatar
              sx={{
                bgcolor: 'goldenrod',
                cursor: 'pointer',
                width: 40,
                height: 40,
                fontSize: '1.2rem',
              }}
              onClick={handleMenuClick}
            >
              {initial}
            </Avatar>
          </li>
        )}
      </ul>
    </Box>
  );

  return (
    <>
      <Box>
        <AppBar component={"nav"} sx={{ bgcolor: 'black' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{
                mr: 2,
                display: { sm: 'none' },
              }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              color={"goldenrod"}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <img src={Logo} alt="logo" height={"70"} width="250" />
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <ul className="navigation-menu">
                <li>
                  <NavLink activeClassName="active" to={"/"}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={"/menu"}>Menu</NavLink>
                </li>
                <li>
                  <NavLink to={"/about"}>About</NavLink>
                </li>
                <li>
                  <NavLink to={"/contact"}>Contact</NavLink>
                </li>
                <li>
                  <ShoppingCartIcon
                    sx={{ color: 'white', cursor: 'pointer', fontSize: '1.8rem' }}
                    onClick={handleCartClick}
                  />
                </li>
                {initial && (
                  <li>
                    <Avatar
                      sx={{
                        bgcolor: 'goldenrod',
                        cursor: 'pointer',
                        width: 40,
                        height: 40,
                        fontSize: '1.2rem',
                      }}
                      onClick={handleMenuClick}
                    >
                      {initial}
                    </Avatar>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </li>
                )}
              </ul>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: '240px',
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box>
          <Toolbar />
        </Box>

        {/* Dialog for cart */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Shopping Cart</DialogTitle>
          <DialogContent>
            {quantities && Object.keys(quantities).length > 0 ? (
              <div>
                {Object.entries(quantities).map(([item, quantity]) => (
                  <Typography key={item}>
                    {item}: {quantity}
                  </Typography>
                ))}
              </div>
            ) : (
              <Typography>Your cart is currently empty. Add items to see them here.</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Header;
