import { LogoutOutlined } from '@mui/icons-material'
import { AppBar, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/auth/authSlice'

export const Navbar = () => {


  const dispatch = useDispatch();
  const handleLogout = ()=>
  {
    dispatch(logout());
    localStorage.removeItem("token")
  }


  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: '80%' },
      }}
    >
      <Toolbar>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>
            Home
          </Typography>
          <IconButton color='error' onClick={handleLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
