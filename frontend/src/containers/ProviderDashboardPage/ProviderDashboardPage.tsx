import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardTable from '../../components/DashboardTable/DashboardTable'
import { initializeScholarshipData } from '../../redux/reducers/ScholarshipDataReducer'
import { useAppDispatch } from '../../redux/store'
import { ctaButtonStyle } from '../../styles/globalStyles'

const ProviderDashboardPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        padding: {
          xs: '100px 20px',
          md: '100px 74px',
        },
        display: 'flex',
        flexDirection: 'column',
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
              onClick={() => {
                dispatch(initializeScholarshipData({}))
                navigate('/scholarships/create')
              }}
            >
              Add Scholarship
            </Button>
            {/* <Button
              variant="contained"
              sx={ctaButtonStyle}
              onClick={() => navigate('/scholarships/create/upload')}
            >
              Add Scholarship via TSV
            </Button> */}
          </Box>
        </Box>
      </Box>
      <DashboardTable />
    </Box>
  )
}

export default ProviderDashboardPage
