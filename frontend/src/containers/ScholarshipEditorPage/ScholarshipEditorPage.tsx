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
  SelectChangeEvent,
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
import useGetScholarshipsData from '../../hooks/useGetScholarshipData'
import { initializeScholarshipData } from '../../redux/reducers/ScholarshipDataReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { ScholarshipData } from '../../redux/types'
import { ctaButtonStyle } from '../../styles/globalStyles'

export interface ScholarshipType {
  id: number
  scholarship_type_name: string
}

const ScholarshipEditorPage = () => {
  const { id } = useParams<{ id: string }>()
  const { getScholarshipData } = useGetScholarshipsData()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)
  const data = useAppSelector((state) => state.scholarshipData)
  const { scholarshipData } = data as { scholarshipData: ScholarshipData }
  const [scholarshipName, setScholarshipName] = useState<string>(
    scholarshipData?.scholarship_name ?? ''
  )
  const [description, setDescription] = useState<string>(
    scholarshipData?.description ?? ''
  )
  const [startDate, setStartDate] = useState<Date | Dayjs | null>(
    dayjs(scholarshipData?.start_date) ?? null
  )
  const [dueDate, setDueDate] = useState<Date | Dayjs | null>(
    dayjs(scholarshipData?.due_date) ?? null
  )
  const [applicationLink, setApplicationLink] = useState<string>(
    scholarshipData?.application_link ?? ''
  )
  const [schoolYear, setSchoolYear] = useState<string>(
    scholarshipData?.school_year ?? ''
  )
  const [scholarshipProviderId, setScholarshipProviderId] = useState<
    number | null
  >(scholarshipData?.scholarship_provider?.id ?? null)
  const [requirements, setRequirements] = useState<string>(
    scholarshipData?.requirements?.[0]?.requirements_text ?? ''
  )
  const [eligibilities, setEligibilities] = useState<string>(
    scholarshipData?.eligibilities?.[0]?.eligibility_text ?? ''
  )
  const [benefits, setBenefits] = useState<string>(
    scholarshipData?.benefits?.[0]?.benefit_name ?? ''
  )
  const [scholarshipTypeId, setScholarshipTypeId] = useState<number | null>(
    scholarshipData?.scholarship_type?.id ?? null
  )
  const [scholarshipType, setScholarshipType] = useState<string>(
    scholarshipData?.scholarship_type?.scholarship_type_name ?? ''
  )
  const [status, setStatus] = useState<string>(scholarshipData?.status ?? '')
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [scholarshipTypes, setScholarshipTypes] = useState<
    { id: number; scholarship_type_name: string }[] | []
  >([])

  const handleBenefitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBenefits(e.target.value)
  }

  const handleEligibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEligibilities(e.target.value)
  }

  const handleRequirementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequirements(e.target.value)
  }

  const handleStartDateChange = (date: Date | Dayjs | null) => {
    setStartDate(date)
  }

  const handleDueDateChange = (date: Date | Dayjs | null) => {
    setDueDate(date)
  }

  useEffect(() => {
    if (user.scholarship_provider) {
      setScholarshipProviderId(user.scholarship_provider.id)
    }

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (scholarshipData) {
      setScholarshipName(scholarshipData.scholarship_name)
      setDescription(scholarshipData.description)
      setStartDate(dayjs(scholarshipData.start_date))
      setDueDate(dayjs(scholarshipData.due_date))
      setApplicationLink(scholarshipData.application_link)
      setBenefits(scholarshipData.benefits?.[0]?.benefit_name)
      setEligibilities(scholarshipData.eligibilities?.[0]?.eligibility_text)
      setRequirements(scholarshipData.requirements?.[0]?.requirements_text)
      setSchoolYear(scholarshipData.school_year)
      setStatus(scholarshipData.status)
      setScholarshipTypeId(scholarshipData.scholarship_type?.id)
      setScholarshipType(
        scholarshipData.scholarship_type?.scholarship_type_name
      )
    }
  }, [scholarshipData])

  useEffect(() => {
    if (user.scholarship_provider) {
      setScholarshipProviderId(user.scholarship_provider.id)
    }
  }, [user])

  useEffect(() => {
    const getScholarshipTypes = async () => {
      const { data } = await axiosInstance.get('/api/v1/scholarship_types')
      setScholarshipTypes(data)
    }

    getScholarshipTypes()
    if (id) {
      getScholarshipData(id)
    }

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (scholarshipType) {
      setScholarshipTypeId(
        scholarshipTypes.find(
          (type) => type.scholarship_type_name === scholarshipType
        )?.id ?? null
      )
    }
  }, [scholarshipType, scholarshipTypes])

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
          `/api/v1/scholarships/${scholarshipData.id}`,
          data,
          { withCredentials: true }
        )
        if (response.data) {
          dispatch(initializeScholarshipData(response.data.scholarship))
          setIsSnackbarOpen(true)
          setSuccessMessage(response.data.message)
          setErrorMessage('')
        }
      } else {
        const response = await axiosInstance.post(
          '/api/v1/scholarships',
          data,
          { withCredentials: true }
        )
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
          setScholarshipTypeId(null)
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
          {scholarshipData.id ? 'Edit Scholarship' : 'Add New Scholarship'}
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
              value={scholarshipType}
              name="scholarship_type"
              onChange={(e: SelectChangeEvent) =>
                setScholarshipType(e.target.value)
              }
            >
              {scholarshipTypes.map((type: ScholarshipType, index: number) => {
                return (
                  <MenuItem key={index} value={type.scholarship_type_name}>
                    {type.scholarship_type_name}
                  </MenuItem>
                )
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
              onChange={(e: SelectChangeEvent) => setStatus(e.target.value)}
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
