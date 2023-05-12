import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'

export const HomeLayout = ({ children }) => {
  return (
    <Box sx={{display:'flex'}}>
      <Navbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
