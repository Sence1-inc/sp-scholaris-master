import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
} from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../../public/images/logo.png'
import { useAppSelector } from '../../redux/store'
import { User } from '../../redux/types'
import { Authenticated, Unauthenticated } from './NavbarComponents'

interface NavbarProps {
  window?: () => Window
}

const drawerWidth = '90vw'

const Navbar: React.FC<NavbarProps> = ({ window }) => {
  const location = useLocation()
  const pathname = location.pathname
  const user: User = useAppSelector((state) => state.persistedReducer.user)
  const isAuthenticated = useAppSelector(
    (state) => state.persistedReducer.isAuthenticated
  )
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const renderItems = () => {
    return !isAuthenticated ? (
      <Unauthenticated
        userType={pathname.includes('/student') ? 'student' : 'provider'}
      />
    ) : (
      <Authenticated user={user} pathname={pathname} />
    )
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: 'center', color: 'common.white' }}
    >
      <Box sx={{ padding: '40px 0' }}>
        <Link to="/">
          <img src={Logo} alt="Scholaris Logo" />
        </Link>
      </Box>
      <Divider />
      {renderItems()}
    </Box>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" sx={{ position: 'relative', padding: '8px' }}>
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          sx={{
            padding: { xs: '0 10px', sm: '0 20px' },
          }}
        >
          <Box>
            <Link to="/">
              <img src={Logo} alt="Scholaris Logo" />
            </Link>
          </Box>
          <Box
            sx={{ display: { md: 'flex', xs: 'none' }, flexDirection: 'row' }}
          >
            {renderItems()}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: 'primary.main',
              padding: '0 20px',
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  )
}

export default Navbar
