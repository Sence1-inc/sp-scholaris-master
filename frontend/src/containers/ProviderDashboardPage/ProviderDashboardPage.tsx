import React from 'react'
import { Box, Button, Container, Typography } from '@mui/material';
import DashboardTable from '../../components/DashboardTable/DashboardTable'

const ProviderDashboardPage: React.FC = () => {
  return (
    <>
    <Box component="section" 
        sx={{
            display: "flex",
            flexDirection: "column"
        }}>
      <Box sx={{ 
            display: "flex" , 
            justifyContent: "space-between", 
            width: "100%"
        }}>
        <Typography variant="h3">Scholarship Dashboard</Typography>
        <Box sx={{ 
            display: "flex" , 
            justifyContent: "space-between", 
            columnGap: "22px"
        }}>
            <Button variant="contained" 
                sx={{
                    fontFamily: "Open Sans",
                    fontSize:"24px",
                    borderRadius: "16px",
                    backgroundColor: "#F36B3B"
                }}>Add Scholarship</Button>
            <Button variant="contained"
                sx={{
                    fontFamily: "Open Sans",
                    fontSize:"24px",
                    borderRadius: "16px",
                    backgroundColor: "#F36B3B"
                }}>Add Scholarship via CSV
                </Button>
        </Box>
        </Box>
        <Box>
            <DashboardTable />
        </Box>      
    </Box>
    </>
  )
}

export default ProviderDashboardPage;
