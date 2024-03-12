import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import {
  Box,
  Button,
  Container,
  FormGroup,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'

const ScholarshipEditorPage = () => {
  return (
    <FormGroup>
      <Container sx={{ padding: { sm: '60px 100px', lg: '120px' } }}>
        <Box p={'50px 0 0'}>
          <Link
            href="#"
            target="_blank"
            sx={{
              fontFamily: 'Roboto',
              fontSize: '36px',
              fontWeight: '700',
              color: '#F36B3B',
              textDecoration: 'none',
            }}
          >
            <ArrowBackIosIcon />
            Dashboard
          </Link>
        </Box>

        <Typography
          p={'50px 0 30px'}
          sx={{
            fontFamily: 'Roboto',
            fontSize: '48px',
            fontWeight: '700',
          }}
        >
          Add New Scholarship
        </Typography>

        <Box
          sx={{
            height: 'auto',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            p: '30px',
            gap: '48px',
            background: '#AFC3D9',
            borderRadius: '32px',
            m: '0 0 80px 0',
            paddingTop: '40px',
            paddingBottom: '40px',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontSize: '24px',
                fontWeight: '700',
                color: '#002147',
              }}
            >
              Scholarship Name
            </Typography>
            <TextField
              required
              id="standard-helperText"
              variant="outlined"
              sx={{
                width: '100%',
                height: '80px',
                borderRadius: '16px',
                border: 'none',
                background: '#fff',
                boxShadow: 3,
                '& fieldset': { border: 'none' },
              }}
              name="scholarship_name"
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontSize: '24px',
                fontWeight: '700',
                color: '#002147',
              }}
            >
              Scholarship Description
            </Typography>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              sx={{
                width: '100%',
                borderRadius: '16px',
                border: 'none',
                background: '#fff',
                boxShadow: 3,
                '& fieldset': { border: 'none' },
              }}
              name="scholarship_description"
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontSize: '24px',
                fontWeight: '700',
                color: '#002147',
              }}
            >
              Requirements
            </Typography>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              sx={{
                width: '100%',
                borderRadius: '16px',
                border: 'none',
                background: '#fff',
                boxShadow: 3,
                '& fieldset': { border: 'none' },
              }}
              name="scholarship_requirements"
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontSize: '24px',
                fontWeight: '700',
                color: '#002147',
              }}
            >
              Benefits
            </Typography>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              sx={{
                width: '100%',
                borderRadius: '16px',
                border: 'none',
                background: '#fff',
                boxShadow: 3,
                '& fieldset': { border: 'none' },
              }}
              name="scholarship_benefits"
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontSize: '24px',
                fontWeight: '700',
                color: '#002147',
              }}
            >
              Eligibility
            </Typography>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              sx={{
                width: '100%',
                borderRadius: '16px',
                border: 'none',
                background: '#fff',
                boxShadow: 3,
                '& fieldset': { border: 'none' },
              }}
              name="scholarship_eligibility"
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontSize: '24px',
                fontWeight: '700',
                color: '#002147',
              }}
            >
              Scholarship Type
            </Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{
                width: '100%',
                height: '80px',
                borderRadius: '16px',
                border: 'none',
                background: '#fff',
                boxShadow: 3,
                '& fieldset': { border: 'none' },
              }}
              name="scholarship_type"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontSize: '24px',
                fontWeight: '700',
                color: '#002147',
              }}
            >
              Application Link
            </Typography>
            <TextField
              id="standard-helperText"
              variant="outlined"
              sx={{
                width: '100%',
                height: '80px',
                borderRadius: '16px',
                border: 'none',
                background: '#fff',
                boxShadow: 3,
                marginBottom: '20px',
                '& fieldset': { border: 'none' },
              }}
              name="scholarship_link"
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              height: 'auto',
              display: 'flex',
              '& > div': {
                flex: '1 1 0',
                marginRight: '10px',
                '&:last-child': {
                  marginRight: '0',
                },
              },
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Roboto',
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#002147',
                  textAlign: 'start',
                }}
              >
                Application Start
              </Typography>
              <TextField
                id="standard-helperText"
                variant="outlined"
                sx={{
                  width: '100%',
                  height: '80px',
                  borderRadius: '16px',
                  border: 'none',
                  background: '#fff',
                  boxShadow: 3,
                  '& fieldset': { border: 'none' },
                }}
                name="scholarship_start"
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Roboto',
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#002147',
                  textAlign: 'start',
                }}
              >
                Application End
              </Typography>
              <TextField
                id="standard-helperText"
                variant="outlined"
                sx={{
                  width: '100%',
                  height: '80px',
                  borderRadius: '16px',
                  border: 'none',
                  background: '#fff',
                  boxShadow: 3,
                  '& fieldset': { border: 'none' },
                }}
                name="scholarship_end"
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Roboto',
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#002147',
                  textAlign: 'start',
                }}
              >
                School Year
              </Typography>
              <TextField
                id="standard-helperText"
                variant="outlined"
                sx={{
                  width: '100%',
                  height: '80px',
                  borderRadius: '16px',
                  border: 'none',
                  background: '#fff',
                  boxShadow: 3,
                  '& fieldset': { border: 'none' },
                }}
                name="application_link"
              />
            </Box>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontSize: '24px',
                fontWeight: '700',
                color: '#002147',
              }}
            >
              Status
            </Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{
                width: '100%',
                height: '80px',
                borderRadius: '16px',
                border: 'none',
                background: '#fff',
                boxShadow: 3,
              }}
              name="status"
            >
              <MenuItem value={'Active'}>Active</MenuItem>
              <MenuItem value={'Inactive'}>Inactive</MenuItem>
            </Select>
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: '100%',
              padding: '20px',
              borderRadius: '16px',
              background: '#F36B3B',

              fontFamily: 'Open Sans',
              fontSize: '24px',
              fontWeight: '700',
            }}
          >
            <Typography variant="h5">Save Scholarship</Typography>
          </Button>
        </Box>
      </Container>
    </FormGroup>
  )
}

export default ScholarshipEditorPage
