import AddBoxIcon from '@mui/icons-material/AddBox'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import {
  Alert,
  Box,
  Button,
  Container,
  FormGroup,
  IconButton,
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
import { ctaButtonStyle } from '../../styles/globalStyles'

const ScholarshipEditorPage = () => {
  const { id } = useParams<{ id: string }>()
  const [scholarshipName, setScholarshipName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [startDate, setStartDate] = useState<Date | Dayjs | null>(null)
  const [dueDate, setDueDate] = useState<Date | Dayjs | null>(null)
  const [applicationLink, setApplicationLink] = useState<string>('')
  const [schoolYear, setSchoolYear] = useState<string>('')
  const [scholarshipProviderId, setScholarshipProviderId] = useState<
    number | null
  >()
  const [requirements, setRequirements] = useState<
    Array<{ requirements_text: string }>
  >([])
  const [eligibilities, setEligibilities] = useState<
    Array<{ eligibility_text: string }>
  >([])
  const [benefits, setBenefits] = useState<Array<{ benefit_name: string }>>([])
  const [scholarshipTypeId, setScholarshipTypeId] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [newBenefit, setNewBenefit] = useState<string>('')
  const [newEligibility, setNewEligibility] = useState<string>('')
  const [newRequirement, setNewRequirement] = useState<string>('')
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

  const handleAddBenefit = () => {
    setBenefits([...benefits, { benefit_name: '' }])
  }

  const handleBenefitChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedBenefits = [...benefits]
    updatedBenefits[index].benefit_name = e.target.value
    setBenefits(updatedBenefits)
  }

  const handleAddNewBenefit = () => {
    if (newBenefit.trim() !== '') {
      setBenefits([...benefits, { benefit_name: newBenefit }])
      setNewBenefit('')
    }
  }

  const handleAddNewEligibility = () => {
    if (newEligibility.trim() !== '') {
      setEligibilities([...eligibilities, { eligibility_text: newEligibility }])
      setNewEligibility('')
    }
  }

  const handleAddEligibility = () => {
    setEligibilities([...eligibilities, { eligibility_text: '' }])
  }

  const handleEligibilityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedEligibility = [...eligibilities]
    updatedEligibility[index].eligibility_text = e.target.value
    setEligibilities(updatedEligibility)
  }

  const handleAddNewRequirement = () => {
    if (newRequirement.trim() !== '') {
      setRequirements([...requirements, { requirements_text: newRequirement }])
      setNewRequirement('')
    }
  }

  const handleAddRequirement = () => {
    setRequirements([...requirements, { requirements_text: '' }])
  }

  const handleRequirementChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedRequirement = [...requirements]
    updatedRequirement[index].requirements_text = e.target.value
    setRequirements(updatedRequirement)
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
    // this will be updated during our Auth sprint
    setScholarshipProviderId(2)
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
          setBenefits(data.benefits)
          setEligibilities(data.eligibilities)
          setRequirements(data.requirements)
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
          setBenefits([])
          setEligibilities([])
          setRequirements([])
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
              id="outlined-basic"
              variant="outlined"
              value={scholarshipName}
              onChange={(e) => setScholarshipName(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {requirements.length > 0 ? (
                requirements.map((requirement, index) => (
                  <TextField
                    key={index}
                    id={`outlined-multiline-static-${index}`}
                    multiline
                    value={requirement.requirements_text}
                    name="requirements"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleRequirementChange(e, index)
                    }
                  />
                ))
              ) : (
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onBlur={handleAddNewRequirement}
                  name="newRequirement"
                />
              )}
              <IconButton onClick={handleAddRequirement}>
                <AddBoxIcon fontSize="large" sx={{ color: 'primary.main' }} />
              </IconButton>
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
              Benefits
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {benefits.length > 0 ? (
                benefits.map((benefit, index) => (
                  <TextField
                    key={index}
                    id={`outlined-multiline-static-${index}`}
                    multiline
                    value={benefit.benefit_name}
                    name="benefits"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleBenefitChange(e, index)
                    }
                  />
                ))
              ) : (
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  onBlur={handleAddNewBenefit}
                  name="newBenefit"
                />
              )}
              <IconButton onClick={handleAddBenefit}>
                <AddBoxIcon fontSize="large" sx={{ color: 'primary.main' }} />
              </IconButton>
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
              Eligibility
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {eligibilities.length > 0 ? (
                eligibilities.map((eligibility, index) => (
                  <TextField
                    key={index}
                    id={`outlined-multiline-static-${index}`}
                    multiline
                    value={eligibility.eligibility_text}
                    name="eligibilities"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleEligibilityChange(e, index)
                    }
                  />
                ))
              ) : (
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  value={newEligibility}
                  onChange={(e) => setNewEligibility(e.target.value)}
                  onBlur={handleAddNewEligibility}
                  name="newEligibility"
                />
              )}
              <IconButton onClick={handleAddEligibility}>
                <AddBoxIcon fontSize="large" sx={{ color: 'primary.main' }} />
              </IconButton>
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
              <MenuItem value={'1'}>1</MenuItem>
              <MenuItem value={'2'}>2</MenuItem>
              <MenuItem value={'3'}>3</MenuItem>
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
