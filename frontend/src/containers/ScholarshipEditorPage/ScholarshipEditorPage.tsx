import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import {
  Alert,
  Box,
  Button,
  Container,
  FormGroup,
  Link,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import {
  ScholarshipType,
  SCHOLARSHIP_TYPES,
} from '../../data/ScholarshipContent'
import { useAppSelector } from '../../redux/store copy'
import { ctaButtonStyle } from '../../styles/globalStyles'

const ScholarshipEditorPage = () => {
  const { id } = useParams<{ id: string }>()
  const user = useAppSelector((state) => state.user)
  const [scholarshipName, setScholarshipName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [startDate, setStartDate] = useState<Date | Dayjs | null>(null)
  const [dueDate, setDueDate] = useState<Date | Dayjs | null>(null)
  const [applicationLink, setApplicationLink] = useState<string>('')
  const [schoolYear, setSchoolYear] = useState<string>('')
  const [scholarshipProviderId, setScholarshipProviderId] = useState<
    number | null
  >(null)
  const [requirements, setRequirements] = useState<string>('')
  const [eligibilities, setEligibilities] = useState<string>('')
  const [benefits, setBenefits] = useState<string>('')
  const [scholarshipTypeId, setScholarshipTypeId] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

  const handleBenefitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBenefits(e.target.value)
  }

  const handleEligibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEligibilities(e.target.value)
  }

  const handleRequirementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequirements(e.target.value)
  }

  const handleScholarshipTypeSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setScholarshipTypeId(e.target.value)
  }

  const handleStatusSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value)
  }

  const handleStartDateChange = (date: Date | Dayjs | null) => {
    setStartDate(date)
  }

  const handleDueDateChange = (date: Date | Dayjs | null) => {
    setDueDate(date)
  }

  useEffect(() => {
    setScholarshipProviderId(user.scholarship_provider.id)
  }, [])

  useEffect(() => {
    const getScholarship = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/v1/scholarships/${id}`)

        if (data) {
          setScholarshipName(data.scholarship_name)
          setDescription(data.description)
          setStartDate(dayjs(data.start_date))
          setDueDate(dayjs(data.due_date))
          setApplicationLink(data.application_link)
          setBenefits(data.benefits[0].benefit_name)
          setEligibilities(data.eligibilities[0].eligibility_text)
          setRequirements(data.requirements[0].requirements_text)
          setSchoolYear(data.school_year)
          setStatus(data.status)
          setScholarshipTypeId(data.scholarship_type.id.toString())
        }
      } catch (error) {}
    }

    if (id) {
      getScholarship()
    }
  }, [id])

  const handleSubmit = async () => {
    const data = {
      scholarship_name: scholarshipName,
      description: description,
      requirements: requirements,
      eligibilities: eligibilities,
      scholarship_type_id: Number(scholarshipTypeId),
      benefits: benefits,
      application_link: applicationLink,
      start_date: startDate?.toISOString(),
      due_date: dueDate?.toISOString(),
      school_year: schoolYear,
      status: status,
      scholarship_provider_id: scholarshipProviderId,
    }

    try {
      if (id) {
        const response = await axiosInstance.put(
          `/api/v1/scholarships/${id}`,
          data
        )
        if (response.data) {
          setIsSnackbarOpen(true)
          setSuccessMessage(response.data.message)
          setErrorMessage('')
        }
      } else {
        const response = await axiosInstance.post('/api/v1/scholarships', data)
        if (response.data) {
          setIsSnackbarOpen(true)
          setSuccessMessage(response.data.message)
          setErrorMessage('')
          setScholarshipName('')
          setDescription('')
          setStartDate(null)
          setDueDate(null)
          setApplicationLink('')
          setBenefits('')
          setEligibilities('')
          setRequirements('')
          setSchoolYear('')
          setStatus('')
          setScholarshipTypeId('')
        }
      }
    } catch (error: any) {
      setIsSnackbarOpen(true)
      setSuccessMessage('')
      setErrorMessage(error.message)
    }
  }

  return (
    <FormGroup>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
        autoHideDuration={6000}
        key="topcenter"
      >
        <Alert
          onClose={() => setIsSnackbarOpen(false)}
          severity={successMessage ? 'success' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {successMessage && successMessage}
          {errorMessage && errorMessage}
        </Alert>
      </Snackbar>
      <Container sx={{ padding: { sm: '60px 100px', lg: '120px' } }}>
        <Box p={'50px 0 0'}>
          <Link
            href="/provider/dashboard"
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
          {id ? 'Edit Scholarship' : 'Add New Scholarship'}
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
              id="outlined-basic"
              variant="outlined"
              value={scholarshipName}
              onChange={(e) => setScholarshipName(e.target.value)}
              name="scholarship_name"
              placeholder="e.g. Excellence in Science Scholarship"
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              placeholder="e.g. The Excellence in Science Scholarship aims to support outstanding students who demonstrate exceptional academic achievement and a passion for scientific inquiry."
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
              id={`outlined-multiline-static`}
              multiline
              value={requirements}
              name="requirements"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleRequirementChange(e)
              }
              placeholder="e.g. Applicants must have a minimum GPA of 3.5 on a 4.0 scale, provide two letters of recommendation from science teachers or professors, and submit a personal statement outlining their academic and career goals in the field of science."
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
              id={`outlined-multiline-static`}
              multiline
              value={benefits}
              name="benefits"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleBenefitChange(e)
              }
              placeholder="e.g. The scholarship provides a one-time award of P25000 to be used towards tuition, books, or other educational expenses."
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
              id={`outlined-multiline-static`}
              multiline
              value={eligibilities}
              name="eligibilities"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleEligibilityChange(e)
              }
              placeholder="e.g. Open to high school seniors or college freshmen and sophomores pursuing a degree in a scientific discipline."
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
                borderRadius: '16px',
                padding: '20px',
                width: '100%',
                '& fieldset': { border: 'none' },
                border: '1px solid var(--primary-color)',
                boxShadow: '-4px -4px 1.9px 0 rgba(0, 0, 0, 10%) inset',
                backgroundColor: 'white',
              }}
              value={scholarshipTypeId}
              name="scholarship_type"
              onChange={(e: any) => handleScholarshipTypeSelect(e)}
            >
              {SCHOLARSHIP_TYPES.map((type: ScholarshipType) => {
                return <MenuItem value={type.id}>{type.name}</MenuItem>
              })}
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
              value={applicationLink}
              name="application_link"
              onChange={(e) => setApplicationLink(e.target.value)}
              placeholder="e.g. www.excellenceinsciencescholarship.org"
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  value={startDate}
                  onChange={handleStartDateChange}
                  sx={{
                    borderRadius: '16px',
                    padding: '20px',
                    width: '100%',
                    '& fieldset': { border: 'none' },
                    border: '1px solid var(--primary-color)',
                    boxShadow: '-4px -4px 1.9px 0 rgba(0, 0, 0, 10%) inset',
                    backgroundColor: 'white',
                  }}
                />
              </LocalizationProvider>
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  value={dueDate}
                  onChange={handleDueDateChange}
                  sx={{
                    borderRadius: '16px',
                    padding: '20px',
                    width: '100%',
                    '& fieldset': { border: 'none' },
                    border: '1px solid var(--primary-color)',
                    boxShadow: '-4px -4px 1.9px 0 rgba(0, 0, 0, 10%) inset',
                    backgroundColor: 'white',
                  }}
                />
              </LocalizationProvider>
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
                value={schoolYear}
                onChange={(e) => setSchoolYear(e.target.value)}
                name="school_year"
                placeholder="e.g. 2024-2025"
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
                borderRadius: '16px',
                padding: '20px',
                width: '100%',
                '& fieldset': {
                  border: 'none',
                },
                border: '1px solid var(--primary-color)',
                boxShadow: '-4px -4px 1.9px 0 rgba(0, 0, 0, 10%) inset',
                backgroundColor: 'white',
              }}
              value={status}
              onChange={(e: any) => handleStatusSelect(e)}
              name="status"
            >
              <MenuItem value={'active'}>Active</MenuItem>
              <MenuItem value={'inactive'}>Inactive</MenuItem>
            </Select>
          </Box>
          <Button
            fullWidth
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            sx={ctaButtonStyle}
          >
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              Save Scholarship
            </Typography>
          </Button>
        </Box>
      </Container>
    </FormGroup>
  )
}

export default ScholarshipEditorPage
