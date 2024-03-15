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
import primaryButtonStyle from '../../styles/theme'


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
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                                }}
                            >
                                <InsertDriveFileIcon /> <span>Upload File</span>
                            </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                component="span"
                                sx={primaryButtonStyle}
                                fullWidth
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
                    </Box>

                </Box>
            </Container>
        </>
    )
}


export default AddScholarshipViaCSVPage