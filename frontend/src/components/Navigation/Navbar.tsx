import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
} from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../../public/images/logo.png'
import { ctaButtonStyle } from '../../styles/globalStyles'

interface NavbarProps {
  window?: () => Window
}

const drawerWidth = '90vw'

const Navbar: React.FC<NavbarProps> = ({ window }) => {
  const location = useLocation()
  const pathname = location.pathname

  const renderItems = () => {
    if (pathname.includes('/student')) {
      return (
        <List
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <ListItem>
            <Typography
              variant="body1"
              component={Link}
              to="/student"
              sx={{ color: 'common.white', textDecoration: 'none' }}
            >
              Newsletter
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant="body1"
              component={Link}
              to="/student/survey"
              sx={{ color: 'common.white', textDecoration: 'none' }}
            >
              Survey
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Button
              sx={{ ...ctaButtonStyle, whiteSpace: 'nowrap' }}
              component={Link}
              to="/scholarships"
            >
              Scholarship Search
            </Button>
          </ListItem>
        </List>
      )
    }

    if (pathname.includes('/provider')) {
      return (
        <List
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <ListItem>
            <Typography
              variant="body1"
              component={Link}
              to="/provider"
              sx={{ color: 'common.white', textDecoration: 'none' }}
            >
              Newsletter
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant="body1"
              component={Link}
              to="/provider/survey"
              sx={{ color: 'common.white', textDecoration: 'none' }}
            >
              Survey
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant="body1"
              component={Link}
              to="/provider/dashboard"
              sx={{ color: 'common.white', textDecoration: 'none' }}
            >
              Dashboard
            </Typography>
          </ListItem>
          <ListItem disablePadding sx={{ width: 'auto' }}>
            <Button
              sx={{ ...ctaButtonStyle, whiteSpace: 'nowrap' }}
              component={Link}
              to="/scholarships"
            >
              Scholarship Search
            </Button>
          </ListItem>
        </List>
      )
    }

    return (
      <List
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <Button
              sx={{ ...ctaButtonStyle, whiteSpace: 'nowrap' }}
              component={Link}
              to="/scholarships"
            >
              Scholarship Search
            </Button>
          </ListItemButton>
        </ListItem>
      </List>
    )
  }

  const [mobileOpen, setMobileOpen] = React.useState(false)

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
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
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
            sx={{ mr: 2, display: { md: 'none' } }}
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
