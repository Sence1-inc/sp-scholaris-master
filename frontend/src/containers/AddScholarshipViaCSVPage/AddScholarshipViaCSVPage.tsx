import React from "react";
import {  
    Box, 
    Container, 
    Link, 
    Typography, 
    Button, 
    TextField 
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const AddScholarshipViaCSVPage: React.FC = () => {
    return (
        <>
            <Container 
                component='section'
                sx={{
                    padding: '20px 10px 50px'
                }}
            >
                <Box
                    p={'20px 0 40px'}
                >
                    <Link href="#" underline="none" target="_blank"
                        sx={{
                            color: '#F36B3B',
                            fontFamily: 'Roboto',
                            fontSize: '36px',
                            fontWeight: '700'
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
                            color: '#002147'
                        }}
                    >
                        Add New Scholarship via CSV
                    </Typography>

                    <Box
                        p={'40px'}

                        sx={{
                            background: '#AFC3D9',
                            borderRadius: '32px'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between'

                            }}
                        >
                            <Typography 
                                sx={{
                                    color: '#686868',
                                    fontFamily: 'Open Sans',
                                    fontSize: '20px',
                                    fontWeight: '600'
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
                                    fontStyle: 'italic'
                                }}
                            >
                                scholarship_template.csv
                            </Typography>
                        </Box>
                            <form>
                                    <TextField
                                        sx={{
                                            width: '100%',
                                            margin: '20px 0',
                                            padding: '20px 0',
                                            "& fieldset": { border: 'none' },
                                            borderWidth: "2px",
                                            borderStyle: "dashed",
                                            borderRadius: '16px',
                                            background: '#fff',
                                            textAlign: 'center'
                                        }}
                                    
                                    type="file" />
                                    <Button variant="contained" color="primary" component="span"
                                        sx={{
                                            width: '100%',
                                            borderRadius: '16px',
                                            padding: '20px 30px',
                                            
                                            background: '#F36B3B',
                                            fontFamily: 'Open Sans',
                                            fontSize: '24px',
                                            fontWeight: '700'
                                        }}
                                    >
                                        Save Scholarship
                                    </Button>
                                    <Box
                                        display={'flex'}
                                        justifyContent={'flex-end'}
                                        p={'20px 0 0'}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#1E3050',
                                                marginRight: '10px',
                                                fontFamily: 'Open Sans',
                                                fontSize: '20px',
                                                fontWeight: '700'
                                            }}
                                        >  
                                            Count: 2 |
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: '#F50F0F',
                                                marginRight: '10px',
                                                fontSize: '20px',
                                                fontWeight: '700'
                                            }}
                                        >  
                                            Error: 1
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: '#1E3050',
                                                fontSize: '20px',
                                                fontWeight: '700'
                                            }}
                                        >  
                                           | Normal: 1
                                        </Typography>
                                    </Box>
                            </form>
                    </Box>

                </Box>
            </Container>
        </>
    )
}


export default AddScholarshipViaCSVPage