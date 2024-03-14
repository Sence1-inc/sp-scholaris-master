import React from 'react'
import { Box, Button, Container, Link, Typography } from '@mui/material';
import DashboardTable from '../../components/DashboardTable/DashboardTable'

const ProviderDashboardPage: React.FC = () => {
  return (
    <>
    <Container fixed sx={{
        padding: "100px 0"
    }}>
        <Box component="section" 
            sx={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "1200px",
                rowGap: "30px"
            }}>
            <Link href="#" sx={{
                fontFamily: "Open Sans",
                fontStyle: "italic",
                fontSize: "20",
                color: "#686868",
                display: "flex",
                alignSelf: "flex-end",
                textDecorationColor: "#686868"                
            }}>scholarship_template.csv</Link>
        <Box sx={{ 
                display: "flex" , 
                justifyContent: "space-between", 
                width: "100%",
                alignItems: "flex-end"
            }}>
            <Typography variant="h3" sx={{
                fontFamily: "Roboto",
                fontWeight: "700",
                letterSpacing: "0px"
            }}>Scholarship Dashboard</Typography>
            <Box sx={{ 
                display: "flex" , 
                justifyContent: "space-between", 
                columnGap: "22px"
            }}>
                <Button variant="contained" 
                    sx={{
                        fontFamily: "Open Sans",
                        fontSize: "24px",
                        fontWeight: "700",
                        borderRadius: "16px",
                        backgroundColor: "#F36B3B",
                        textTransform: "none",
                        padding: "12px 20px",
                        letterSpacing: "0px"
                    }}>Add Scholarship</Button>
                <Button variant="contained"
                    sx={{
                        fontFamily: "Open Sans",
                        fontSize: "24px",
                        fontWeight: "700",
                        borderRadius: "16px",
                        backgroundColor: "#F36B3B",
                        textTransform: "none",
                        padding: "12px 20px",
                        letterSpacing: "0px"
                    }}>Add Scholarship via CSV
                    </Button>
            </Box>
            </Box>
            <Box>
                <DashboardTable />
            </Box>      
        </Box>
    </Container> 
    </>
  )
}

export default ProviderDashboardPage;
