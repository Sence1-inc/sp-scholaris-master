import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
  Skeleton
} from '@mui/material'
import React, { useEffect, useState, useCallback, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../../public/images/logo.png'
import { useAppSelector } from '../../redux/store'
import { User } from '../../redux/types'
import { Authenticated, Unauthenticated } from './NavbarComponents'
import profileTheme from '../../styles/profileTheme'
import { USER_TYPES } from '../../constants/constants'

interface NavbarProps {
  window?: () => Window
}

const Navbar: React.FC<NavbarProps> = ({ window }) => {
  const location = useLocation()
  const pathname = location.pathname
  const user: User = useAppSelector((state) => state.user)
  const isAuthenticated = useAppSelector(
    (state) => state.isAuthenticated
  )
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  const [isAuthReady, setIsAuthReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAuthReady(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isMobile && mobileOpen) {
      setMobileOpen(false)
    }
  }, [isMobile, mobileOpen])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.paddingRight = '0px'
    }
    
    if (mobileOpen && isMobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [mobileOpen, isMobile])

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prevState) => !prevState)
  }, [])

  const renderItems = useCallback(() => {
    if (!isAuthReady) {
      return (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          width: { xs: '100%', md: 'auto' }
        }}>
          <Skeleton variant="rectangular" width={80} height={36} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
        </Box>
      )
    }
    
    const userType = pathname.split('/')[1] as keyof typeof USER_TYPES || 'student'
    
    return !isAuthenticated ? (
      <Unauthenticated userType={userType} />
    ) : (
      <Authenticated user={user} />
    )
  }, [isAuthenticated, user, pathname, isAuthReady])

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
            loading="lazy"
          />
        </Link>
      </Box>
      <Divider />
      
      {(isAuthReady || mobileOpen) && renderItems()}
    </Box>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
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
                loading="lazy"
              />
            </Link>
          </Box>
          <Box sx={profileTheme.navigation.mainNavList}>
            {renderItems()}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ 
              display: { md: 'none' },
              ml: 1
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
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
    </Box>
  )
}

export default memo(Navbar)