import React from 'react'
import { Box, Button, Container, Link, Typography } from '@mui/material';
import DashboardTable from '../../components/DashboardTable/DashboardTable'

const ProviderDashboardPage: React.FC = () => {
  return (
    <>
    <Box sx={{
        padding: {
            xs: "100px 20px",
            md: "100px 74px"
        }
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
                fontSize: "1rem",
                color: "#686868",
                display: "flex",
                alignSelf: "flex-end",
                textDecorationColor: "#686868"                
            }}>scholarship_template.csv</Link>
        <Box sx={{ 
                display: "flex" , 
                flexDirection: {
                    xs: "column",
                    md: "row"
                },
                justifyContent: "space-between", 
                width: "100%",
                alignItems: "flex-start",
                rowGap: "20px"
            }}>
            <Typography variant="h3" sx={{
                fontFamily: "Roboto",
                fontWeight: "700",
                letterSpacing: "0px",
                fontSize: "2.5rem",
                display: "flex",
                alignSelf: {
                    xs: "flex-start",
                    md: "flex-end"
                }
            }}>Scholarship Dashboard</Typography>
            <Box sx={{ 
                display: "flex" , 
                flexDirection: {
                    xs: "column",
                    sm: "row"
                },
                justifyContent: "space-between", 
                columnGap: "20px",
                rowGap: "20px",
                width: {
                    xs: "100%",
                    sm: "auto"
                }
            }}>
                <Button variant="contained" 
                    sx={{
                        fontFamily: "Open Sans",
                        fontSize: "1rem",
                        fontWeight: "700",
                        borderRadius: "16px",
                        backgroundColor: "#F36B3B",
                        textTransform: "none",
                        padding: "12px 20px",
                        letterSpacing: "0px",
                    }}>Add Scholarship</Button>
                <Button variant="contained"
                    sx={{
                        fontFamily: "Open Sans",
                        fontSize: "1rem",
                        fontWeight: "700",
                        borderRadius: "16px",
                        backgroundColor: "#F36B3B",
                        textTransform: "none",
                        padding: "12px 20px",
                        letterSpacing: "0px",
                    }}>Add Scholarship via CSV
                    </Button>
            </Box>
            </Box>
            <Box>
                <DashboardTable />
            </Box>      
        </Box>
    </Box> 
    </>
  )
}

export default ProviderDashboardPage;
