import React, { useState } from "react";
import { Box, Container, TextField, Typography, Select, MenuItem, FormGroup, Button, Link } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './AddEditScholarshipPage.css'


    const AddEditScholarshipPage = () => {

        return (
        <>
            <FormGroup>
                <Container>
                    <Box 
                        component="section"
                        p={"50px 0 0"}
                    >
                         <Link href="#" target="_blank"

                        sx={{
                            fontFamily: 'Roboto', fontSize: '36px',
                            fontWeight: '700',
                            color: '#F36B3B',
                            textDecoration: 'none'
                        }}
                        >
                        <ArrowBackIosIcon/>Dashboard
                        </Link>
                    </Box>
                   

                    <Typography
                        p={"50px 0 30px"}

                        sx={{
                            fontFamily: 'Roboto',
                            fontSize: '48px',
                            fontWeight: '700'
                        }}
                        >Add New Scholarship
                    </Typography>

                    <Box component="section"
                        height= 'auto'
                        width= 'auto'
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                        p="30px" gap={1}
                        sx={{ background: '#AFC3D9',
                            borderRadius: '32px'
                        }}

                        m="0 0 80px 0"
                    >
                        
                        <Typography
                            sx={{
                                fontFamily: 'Roboto', 
                                fontSize: '24px', 
                                fontWeight: '700',
                                color: '#002147'
                            }}
                        >
                            Scholarship Name
                        </Typography>
                        <TextField
                            required
                            id="standard-helperText"
                            variant="outlined"

                            sx={{ 
                                width: "100%",
                                borderRadius: '16px', border: 'none',
                                background: '#fff', boxShadow: 3, 
                                '& fieldset': { border: 'none' }
                            }}

                            name="scholarship_name"
                        />

                        <Typography
                            sx={{
                                fontFamily: 'Roboto', 
                                fontSize: '24px', 
                                fontWeight: '700',
                                color: '#002147'
                            }}
                        >
                            Scholarship Description
                        </Typography>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={4}

                            sx={{ 
                                width: "100%",
                                borderRadius: '16px', border: 'none',
                                background: '#fff', boxShadow: 3, 
                                '& fieldset': { border: 'none' }
                            }}

                            name="scholarship_description"
                        />

                        <Typography
                            sx={{
                                fontFamily: 'Roboto', 
                                fontSize: '24px', 
                                fontWeight: '700',
                                color: '#002147'
                            }}
                        >
                            Requirements
                        </Typography>
                        <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}

                            sx={{ 
                                width: "100%",
                                borderRadius: '16px', border: 'none',
                                background: '#fff', boxShadow: 3, 
                                '& fieldset': { border: 'none' } 
                            }}

                            name="scholarship_requirements"
                        />

                        <Typography
                            sx={{
                                fontFamily: 'Roboto', 
                                fontSize: '24px', 
                                fontWeight: '700',
                                color: '#002147'
                            }}
                        >
                            Benefits
                        </Typography>
                        <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}

                            sx={{ 
                                width: "100%",
                                borderRadius: '16px', border: 'none',
                                background: '#fff', boxShadow: 3, 
                                '& fieldset': { border: 'none' } 
                            }}

                            name="scholarship_benefits"
                        />

                        <Typography
                            sx={{
                                fontFamily: 'Roboto', 
                                fontSize: '24px', 
                                fontWeight: '700',
                                color: '#002147'
                            }}
                        >
                            Eligibility
                        </Typography>
                        <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}

                            sx={{ 
                                width: "100%",
                                borderRadius: '16px', border: 'none',
                                background: '#fff', boxShadow: 3, 
                                '& fieldset': { border: 'none' } 
                            }}

                            name="scholarship_eligibility"
                        />

                        <Typography
                            sx={{
                                fontFamily: 'Roboto', 
                                fontSize: '24px', 
                                fontWeight: '700',
                                color: '#002147'
                            }}
                        >
                            Scholarship Type
                        </Typography>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"

                            sx={{ 
                                width: "100%",
                                borderRadius: '16px', border: 'none',
                                background: '#fff', boxShadow: 3, 
                                '& fieldset': { border: 'none' } 
                            }}

                            name="scholarship_type"
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>

                        <Typography
                            sx={{
                                fontFamily: 'Roboto', 
                                fontSize: '24px', 
                                fontWeight: '700',
                                color: '#002147'
                            }}
                        >
                            Application Link
                        </Typography>
                        <TextField
                            id="standard-helperText"
                            variant="outlined"

                            sx={{ 
                                width: "100%",
                                borderRadius: '16px', border: 'none',
                                background: '#fff', boxShadow: 3 ,
                                marginBottom: '20px', 
                                '& fieldset': { border: 'none' }
                            }}

                            name="scholarship_link"
                        />

                        <Box 
                            component="section"
                            height= 'auto'
                            width= '100%'
                            display={"flex"}
                            justifyContent={"space-between"}
                        >
                            <Typography
                                sx={{
                                    fontFamily: 'Roboto', 
                                    fontSize: '24px', 
                                    fontWeight: '700',
                                    color: '#002147'
                                }}
                            >
                                Application Start
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily: 'Roboto', 
                                    fontSize: '24px', 
                                    fontWeight: '700',
                                    color: '#002147'
                                }}
                            >
                                Application End
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily: 'Roboto', 
                                    fontSize: '24px', 
                                    fontWeight: '700',
                                    color: '#002147'
                                }}
                            >
                                School Year
                            </Typography>
                        </Box>

                        <Box
                            component="section"
                            height= 'auto'
                            width= '100%'
                            gap={5}
                            display={"flex"}
                        >
                            <TextField
                                id="standard-helperText"
                                variant="outlined"

                                sx={{ 
                                    width: "100%",
                                    borderRadius: '16px', border: 'none',
                                    background: '#fff', boxShadow: 3, 
                                    '& fieldset': { border: 'none' } 
                                }}

                                name="scholarship_start"
                            />
                            <TextField
                                id="standard-helperText"
                                variant="outlined"

                                sx={{ 
                                    width: "100%",
                                    borderRadius: '16px', border: 'none',
                                    background: '#fff', boxShadow: 3, 
                                    '& fieldset': { border: 'none' } 
                                }}

                                name="scholarship_end"
                            />
                            <TextField
                                id="standard-helperText"
                                variant="outlined"
                                

                                sx={{ 
                                    width: "100%",
                                    borderRadius: '16px', border: 'none',
                                    background: '#fff', boxShadow: 3, 
                                    '& fieldset': { border: 'none' } 
                                }}

                                name="application_link"
                            />
                        </Box>

                        <Typography
                             sx={{
                                fontFamily: 'Roboto', 
                                fontSize: '24px', 
                                fontWeight: '700',
                                color: '#002147'
                            }}
                        >
                            Status
                        </Typography>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"

                            sx={{ 
                                width: "100%",
                                borderRadius: '16px', border: 'none',
                                background: '#fff', boxShadow: 3 
                            }}

                            name="scholarship_type"
                        >
                            <MenuItem value={'Active'}>Active</MenuItem>
                            <MenuItem value={'Inactive'}>Inactive</MenuItem>
                        </Select>

                        <Button 
                            type="submit"
                            variant="contained"
                            
                            sx={{width: '100%',
                                padding: '20px',
                                borderRadius: '16px',
                                background: '#F36B3B',

                                fontFamily: 'Open Sans', fontSize: '24px',
                                fontWeight: '700',

                                margin: '40px 0 20px'
                            }}
                        >
                                Save Scholarship
                        </Button>

                    </Box>

                    </Container>
            </FormGroup>

        </>
        );
    }


export default AddEditScholarshipPage