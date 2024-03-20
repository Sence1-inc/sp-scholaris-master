import { Box, Button, Link, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardTable from '../../components/DashboardTable/DashboardTable'
import { ctaButtonStyle } from '../../styles/globalStyles'

const ProviderDashboardPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        padding: {
          xs: '100px 20px',
          md: '100px 74px',
        },
      }}
    >
      <Box
        component="section"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '1200px',
          rowGap: '30px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'flex-start',
            rowGap: '20px',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Roboto',
              fontWeight: '700',
              letterSpacing: '0px',
              fontSize: '2.5rem',
              display: 'flex',
              alignSelf: {
                xs: 'flex-start',
                md: 'flex-end',
              },
            }}
          >
            Scholarship Dashboard
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              justifyContent: 'space-between',
              columnGap: '20px',
              rowGap: '20px',
              width: {
                xs: '100%',
                sm: 'auto',
              },
            }}
          >
            <Button
              variant="contained"
              sx={ctaButtonStyle}
              onClick={() => navigate('/scholarships/create')}
            >
              Add Scholarship
            </Button>
            <Button
              variant="contained"
              sx={ctaButtonStyle}
              onClick={() => navigate('/scholarships/create/upload')}
            >
              Add Scholarship via CSV
            </Button>
          </Box>
        </Box>
        <Box>
          <DashboardTable />
        </Box>
      </Box>
    </Box>
  )
}

export default ProviderDashboardPage
