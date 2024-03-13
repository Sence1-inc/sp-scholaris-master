import AddIcon from '@mui/icons-material/Add'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import {
  Box,
  Button,
  Container,
  FormGroup,
  IconButton,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'

const ScholarshipEditorPage = () => {
  const { id } = useParams<{ id: string }>()
  const [scholarshipName, setScholarshipName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [dueDate, setDueDate] = useState<string>('')
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
  const [scholarshipTypeId, setScholarshipTypeId] = useState<number>(0)
  const [status, setStatus] = useState<string>('')
  const [newBenefit, setNewBenefit] = useState('')
  const [newEligibility, setNewEligibility] = useState('')
  const [newRequirement, setNewRequirement] = useState('')

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

  useEffect(() => {
    // this will be updated during our Auth sprint
    setScholarshipProviderId(2)
  }, [])

  useEffect(() => {
    const getScholarship = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/v1/scholarships/${id}`)
        console.log(data)
        if (data) {
          setScholarshipName(data.scholarship_name)
          setDescription(data.description)
          setStartDate(data.start_date)
          setDueDate(data.due_date)
          setApplicationLink(data.application_link)
          setBenefits(data.benefits)
          setEligibilities(data.eligibilities)
          setRequirements(data.requirements)
          setSchoolYear(data.school_year)
          setStatus(data.status)
          setScholarshipTypeId(data.scholarship_type.id)
        }
      } catch (error) {}
    }

    if (id) {
      getScholarship()
    }
  }, [id])

  const handleSubmit = () => {}

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
              value={scholarshipName}
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
              value={description}
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
                    sx={{
                      width: '100%',
                      borderRadius: '16px',
                      border: 'none',
                      background: '#fff',
                      boxShadow: 3,
                      '& fieldset': { border: 'none' },
                    }}
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
                  sx={{
                    width: '100%',
                    borderRadius: '16px',
                    border: 'none',
                    background: '#fff',
                    boxShadow: 3,
                    '& fieldset': { border: 'none' },
                  }}
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onBlur={handleAddNewRequirement}
                  name="newRequirement"
                />
              )}
              <IconButton onClick={handleAddRequirement}>
                <AddIcon sx={{ color: 'secondary.main' }} />
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
                    sx={{
                      width: '100%',
                      borderRadius: '16px',
                      border: 'none',
                      background: '#fff',
                      boxShadow: 3,
                      '& fieldset': { border: 'none' },
                    }}
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
                  sx={{
                    width: '100%',
                    borderRadius: '16px',
                    border: 'none',
                    background: '#fff',
                    boxShadow: 3,
                    '& fieldset': { border: 'none' },
                  }}
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  onBlur={handleAddNewBenefit}
                  name="newBenefit"
                />
              )}
              <IconButton onClick={handleAddBenefit}>
                <AddIcon sx={{ color: 'secondary.main' }} />
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
                    sx={{
                      width: '100%',
                      borderRadius: '16px',
                      border: 'none',
                      background: '#fff',
                      boxShadow: 3,
                      '& fieldset': { border: 'none' },
                    }}
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
                  sx={{
                    width: '100%',
                    borderRadius: '16px',
                    border: 'none',
                    background: '#fff',
                    boxShadow: 3,
                    '& fieldset': { border: 'none' },
                  }}
                  value={newEligibility}
                  onChange={(e) => setNewEligibility(e.target.value)}
                  onBlur={handleAddNewEligibility}
                  name="newEligibility"
                />
              )}
              <IconButton onClick={handleAddEligibility}>
                <AddIcon sx={{ color: 'secondary.main' }} />
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
                width: '100%',
                height: '80px',
                borderRadius: '16px',
                border: 'none',
                background: '#fff',
                boxShadow: 3,
                '& fieldset': { border: 'none' },
              }}
              value={scholarshipTypeId} // Ensure scholarshipTypeId is correctly initialized to 1
              name="scholarship_type"
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
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
              value={applicationLink}
              name="application_link"
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
                  value={dayjs(startDate)}
                  sx={{
                    width: '100%',
                    height: '80px',
                    borderRadius: '16px',
                    border: 'none',
                    background: '#fff',
                    boxShadow: 3,
                    '& fieldset': { border: 'none' },
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
                  value={dayjs(dueDate)}
                  sx={{
                    width: '100%',
                    height: '80px',
                    borderRadius: '16px',
                    border: 'none',
                    background: '#fff',
                    boxShadow: 3,
                    '& fieldset': { border: 'none' },
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
                sx={{
                  width: '100%',
                  height: '80px',
                  borderRadius: '16px',
                  border: 'none',
                  background: '#fff',
                  boxShadow: 3,
                  '& fieldset': { border: 'none' },
                }}
                value={schoolYear}
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
                width: '100%',
                height: '80px',
                borderRadius: '16px',
                border: 'none',
                background: '#fff',
                boxShadow: 3,
              }}
              value={status}
              name="status"
            >
              <MenuItem value={'active'}>Active</MenuItem>
              <MenuItem value={'inactive'}>Inactive</MenuItem>
            </Select>
          </Box>
          <Button
            onClick={handleSubmit}
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
