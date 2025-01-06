import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
} from '@mui/material'
import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../../public/images/logo.png'
import { useAppSelector } from '../../redux/store'
import { User } from '../../redux/types'
import { Authenticated, Unauthenticated } from './NavbarComponents'
import profileTheme from '../../styles/profileTheme'

interface NavbarProps {
  window?: () => Window
}

const Navbar: React.FC<NavbarProps> = ({ window }) => {
  const location = useLocation()
  const pathname = location.pathname
  const user: User = useAppSelector((state) => state.persistedReducer.user)
  const isAuthenticated = useAppSelector(
    (state) => state.persistedReducer.isAuthenticated
  )
  const [mobileOpen, setMobileOpen] = React.useState(false)

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.paddingRight = '0px'
    }
  }, [mobileOpen])

  const renderItems = () => {
    return !isAuthenticated ? (
      <Unauthenticated userType={pathname.split('/')[1]} />
    ) : (
      <Authenticated user={user} />
    )
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={profileTheme.navigation.mainNavDrawerContainer}
    >
      <Box sx={profileTheme.navigation.mainNavLogoContainer}>
        <Link to="/">
          <Box
            component="img"
            src={Logo}
            alt="Scholaris Logo"
            sx={profileTheme.navigation.mainNavLogo}
          />
        </Link>
      </Box>
      <Divider />
      {renderItems()}
    </Box>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <>
      <Box sx={{ display: 'flex', position: 'sticky', top: 0, zIndex: 999 }}>
        <AppBar component="nav" sx={profileTheme.navigation.mainNav}>
          <Toolbar sx={profileTheme.navigation.mainNavContainer}>
            <Box>
              <Link to="/">
                <Box
                  component="img"
                  src={Logo}
                  alt="Scholaris Logo"
                  sx={profileTheme.navigation.mainNavLogo}
                />
              </Link>
            </Box>
            <Box sx={profileTheme.navigation.mainNavList}>{renderItems()}</Box>
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
            sx={profileTheme.navigation.mainNavDrawer}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </>
  )
}

export default Navbar
