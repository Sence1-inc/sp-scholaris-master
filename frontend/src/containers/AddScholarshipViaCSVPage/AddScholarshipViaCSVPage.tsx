import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { Box, Container, Link, Typography } from '@mui/material'
import React from 'react'
import { PrimaryButton } from '../../styles/globalStyles'

const AddScholarshipViaCSVPage: React.FC = () => {
  return (
    <Container
      component="section"
      sx={{
        padding: '20px 10px 50px',
      }}
    >
      <Box p={'20px 0 40px'}>
        <Link
          href="/provider/dashboard"
          underline="none"
          sx={{
            color: '#F36B3B',
            fontFamily: 'Roboto',
            fontSize: '36px',
            fontWeight: '700',
          }}
        >
          <ArrowBackIosIcon /> Dashboard
        </Link>

        <Typography
          p={'40px 0 30px'}
          sx={{
            fontFamily: 'Roboto',
            fontSize: '48px',
            fontWeight: '700',
            color: '#002147',
          }}
        >
          Add New Scholarship via CSV
        </Typography>

        <Box
          p={'40px'}
          sx={{
            background: '#AFC3D9',
            borderRadius: '32px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                color: '#686868',
                fontFamily: 'Open Sans',
                fontSize: '20px',
                fontWeight: '600',
              }}
            >
              Upload CSV File
            </Typography>
            <Typography
              sx={{
                color: '#686868',
                fontFamily: 'Open Sans',
                fontSize: '20px',
                fontWeight: '400',
                fontStyle: 'italic',
              }}
            >
              scholarship_template.csv
            </Typography>
          </Box>
          <Box
            sx={{
              margin: '20px 0',
              padding: '20px 0',
              borderWidth: '2px',
              borderStyle: 'dashed',
              borderRadius: '16px',
              background: '#fff',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              '& input': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer',
              },
            }}
          >
            <input type="file" />
            <Typography
              variant="body1"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                color: 'primary.main',
              }}
            >
              <InsertDriveFileIcon /> <span>Upload File</span>
            </Typography>
          </Box>
          <PrimaryButton variant="contained" fullWidth>
            Save Scholarship
          </PrimaryButton>
          <Box display={'flex'} justifyContent={'flex-end'} p={'20px 0 0'}>
            <Typography
              sx={{
                color: 'primary.main',
                marginRight: '10px',
                fontWeight: '700',
              }}
            >
              Count: 2 |
            </Typography>
            <Typography
              color="error"
              sx={{
                marginRight: '10px',
                fontWeight: '700',
              }}
            >
              Error: 1
            </Typography>
            <Typography
              sx={{
                color: 'primary.main',
                fontWeight: '700',
              }}
            >
              | Normal: 1
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default AddScholarshipViaCSVPage
