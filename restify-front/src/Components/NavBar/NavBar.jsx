import React, { useState, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ImageIcon from '@mui/icons-material/Image';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FeedIcon from '@mui/icons-material/Feed';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import "./style.css"

import { NavLink } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import NotificationDropdown from './NotificationDropdown';



function NavBar() {


  return (
    <>
    <div className="navbar">
      <Box sx={{ flexGrow: 1, mx: 0 , my: 0 }}>
        <AppBar position="static" sx={{ bgcolor: '#292b2c' }}>
          <Toolbar>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
              Restify
            </Typography>

            <IconButton component={NavLink}
              color="inherit"
              to="/restaurant/search">
              <HomeIcon />
            </IconButton>
            <IconButton
              color="inherit"
              component={NavLink}
              to="/feed">
              <FeedIcon />
            </IconButton>
            <IconButton
              color="inherit"
              component={NavLink}
              to="/restaurant/create">
              <RestaurantIcon />
            </IconButton>
            <IconButton
              color="inherit"
              component={NavLink}
              to="/restaurant/addmenu">
              <MenuBookIcon />
            </IconButton>
            <IconButton
              color="inherit"
              component={NavLink}
              to="/restaurant/addimage">
              <ImageIcon/>
            </IconButton>
            <IconButton component={NavLink}
              color="inherit"
              to="/notifications">
              <NotificationsIcon />
            </IconButton>

            <ProfileDropdown/>
          </Toolbar>
        </AppBar>
      </Box>

    </div>
    </>
  );
}

export default NavBar;
