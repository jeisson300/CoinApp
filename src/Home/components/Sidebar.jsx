import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import { Assignment, BorderColor, Create } from '@mui/icons-material'
import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

let menus = [
  { menu: 'Income', url: '/income' },
  { menu: 'Bill', url: '/bill' },
  { menu: 'Holding', url: '/holding' },
  { menu: 'Wallet', url: '/wallet' },
]
export const Sidebar = () => {
  const { name } = useSelector((state) => state.auth)
  return (
    <Box component="nav" sx={{ width: { sm: '20%' }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant="permanent" //temporary
        open={true}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: { sm: '20%' },
          },
        }}
      >
        <Toolbar>
          <Typography variant="h5" noWrap component="div">
            {name}
          </Typography>
        </Toolbar>
        <Divider />
        <List sx={{ mt: 5 }}>
          {menus.map(({ menu, url }) => (
            <>
              <ListItem key={menu} disablePadding sx={{ mb: 2 }}>
                <NavLink
                  className="nav-link"
                  to={url}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <ListItemButton>
                    {/* <ListItemIcon>
                    <Create />
                  </ListItemIcon> */}
                    <ListItemText primary={menu} />
                  </ListItemButton>
                </NavLink>
              </ListItem>
              <hr />
            </>
          ))}
        </List>
      </Drawer>
    </Box>
  )
}
