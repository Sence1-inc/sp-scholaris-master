import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import CTAButton from '../../components/CustomButton/CTAButton'
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar'
import CustomTextfield from '../../components/CutomTextfield/CustomTextfield'
import HelperText from '../../components/HelperText/HelperText'
import useGetScholarshipsData from '../../hooks/useGetScholarshipData'
import { initializeScholarshipData } from '../../redux/reducers/ScholarshipDataReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { BenefitCategory, ScholarshipData } from '../../redux/types'

export interface ScholarshipType {
  id: number
  scholarship_type_name: string
}

type Errors = {
  scholarship_name: string
  description: string
  benefits: string
  benefit_categories: string
  requirements: string
  eligibilities: string
  start_date: string
  due_date: string
  application_link: string
  school_year: string
  status: string
  scholarship_type: string
}

const ScholarshipEditorPage = () => {
  const { id } = useParams<{ id: string }>()
  const { getScholarshipData } = useGetScholarshipsData()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.persistedReducer.user)
  const data = useAppSelector((state) => state.persistedReducer.scholarshipData)
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
  const [checkedCategories, setCheckedCategories] = useState<
    BenefitCategory[] | []
  >(scholarshipData.benefit_categories ?? [])
  const [benefitCategories, setBenefitCategories] = useState<BenefitCategory[]>(
    []
  )
  const [scholarshipTypeId, setScholarshipTypeId] = useState<number | null>(
    scholarshipData?.scholarship_type?.id ?? null
  )
  const [scholarshipType, setScholarshipType] = useState<string>(
    scholarshipData?.scholarship_type?.scholarship_type_name ?? ''
  )
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true)
  const [status, setStatus] = useState<string>(scholarshipData?.status ?? '')
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [scholarshipTypes, setScholarshipTypes] = useState<
    { id: number; scholarship_type_name: string }[] | []
  >([])
  const [errors, setErrors] = useState<Errors>({
    scholarship_name: '',
    description: '',
    requirements: '',
    eligibilities: '',
    benefits: '',
    benefit_categories: '',
    start_date: '',
    due_date: '',
    application_link: '',
    school_year: '',
    status: '',
    scholarship_type: '',
  })
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)

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
    const getBenefitCategories = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/benefit_categories')
        if (response.data) {
          setBenefitCategories(response.data)
        }
      } catch (error) {
        console.log('Error getting benefit categories: ', error)
      }
    }

    getBenefitCategories()
  }, [])

  useEffect(() => {
    if (scholarshipData) {
      setScholarshipName(scholarshipData.scholarship_name)
      setDescription(scholarshipData.description)
      setStartDate(dayjs(scholarshipData.start_date))
      setDueDate(dayjs(scholarshipData.due_date))
      setApplicationLink(scholarshipData.application_link)
      setBenefits(scholarshipData.benefits?.[0]?.benefit_name)
      setCheckedCategories(scholarshipData.benefit_categories)
      setEligibilities(scholarshipData.eligibilities?.[0]?.eligibility_text)
      setRequirements(scholarshipData.requirements?.[0]?.requirements_text)
      setSchoolYear(scholarshipData.school_year)
      setStatus(scholarshipData.status)
      setScholarshipTypeId(scholarshipData.scholarship_type?.id)
      setScholarshipType(
        scholarshipData.scholarship_type?.scholarship_type_name
      )
    }
    // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, [scholarshipType, scholarshipTypes])

  const validationConditions = [
    {
      condition: !scholarshipName,
      field: 'scholarship_name',
      message: 'Please provide the scholarship name.',
    },
    {
      condition: !description,
      field: 'description',
      message: 'Please provide the description.',
    },
    {
      condition: !requirements,
      field: 'requirements',
      message: 'Please provide the requirements.',
    },
    {
      condition: !eligibilities,
      field: 'eligibilities',
      message: 'Please provide the eligibilities.',
    },
    {
      condition: !benefits,
      field: 'benefits',
      message: 'Please provide the benefits.',
    },
    {
      condition: !checkedCategories || checkedCategories.length === 0,
      field: 'benefit_categories',
      message: 'Please provide the categories that describe your benefits.',
    },
    {
      condition: !startDate,
      field: 'start_date',
      message: 'Please provide the application start date.',
    },
    {
      condition: !dueDate,
      field: 'due_date',
      message: 'Please provide the application due date.',
    },
    {
      condition: !applicationLink,
      field: 'application_link',
      message: 'Please provide the application link.',
    },
    {
      condition: !schoolYear,
      field: 'school_year',
      message: 'Please provide the school year.',
    },
    {
      condition: !status,
      field: 'status',
      message: 'Please provide the status.',
    },
    {
      condition: !scholarshipType,
      field: 'scholarship_type',
      message: 'Please provide the scholarship type.',
    },
  ]

  useEffect(() => {
    if (!isInitialLoad) {
      const errorMessages: any = validationConditions
        .filter(({ condition }) => condition)
        .reduce((acc: any, item) => {
          acc[item.field] = item.message
          return acc
        }, {})
      setErrors(errorMessages)
    }

    if (successMessage) {
      setErrors({
        scholarship_name: '',
        description: '',
        requirements: '',
        eligibilities: '',
        benefits: '',
        benefit_categories: '',
        start_date: '',
        due_date: '',
        application_link: '',
        school_year: '',
        status: '',
        scholarship_type: '',
      })
    }

    // eslint-disable-next-line
  }, [
    scholarshipName,
    description,
    requirements,
    benefits,
    checkedCategories,
    eligibilities,
    startDate,
    dueDate,
    applicationLink,
    schoolYear,
    status,
    scholarshipType,
    isInitialLoad,
  ])

  const handleBenefitCategoryToggle = (categoryId: number) => () => {
    let newCheckedCategories = []
    if (!!checkedCategories && checkedCategories.length > 0) {
      const isChecked = checkedCategories.find(
        (checkedCategory) => checkedCategory.id === categoryId
      )

      newCheckedCategories = isChecked
        ? checkedCategories.filter((c) => c.id !== categoryId)
        : [
            ...checkedCategories,
            benefitCategories.find((c) => c.id === categoryId)!,
          ]

      setCheckedCategories(newCheckedCategories)
    } else {
      newCheckedCategories.push(
        benefitCategories.find((c) => c.id === categoryId)
      )
      setCheckedCategories(newCheckedCategories as BenefitCategory[])
    }

    // setCheckedCategories(newCheckedCategories)
  }

  const handleSubmit = async () => {
    setIsInitialLoad(false)
    const errorMessages = validationConditions
      .filter(({ condition }) => condition)
      .map(({ message }) => message)
    const hasErrors = errorMessages.length > 0

    if (hasErrors) {
      setIsSnackbarOpen(true)
      setErrorMessage('Please fill in the required details.')
      const newErrors: any = validationConditions.reduce<{
        [key: string]: string
      }>((acc, { condition, field, message }) => {
        if (condition) {
          acc[field] = message
        }
        return acc
      }, {})

      setErrors({ ...errors, ...newErrors })
    } else {
      setIsButtonLoading(true)
      const data = {
        scholarship_name: scholarshipName,
        description: description,
        requirements: requirements,
        eligibilities: eligibilities,
        scholarship_type_id: Number(scholarshipTypeId),
        benefits: benefits,
        benefit_categories: checkedCategories,
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
            setIsButtonLoading(false)
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
            setIsButtonLoading(false)
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
            setScholarshipType('')
            setCheckedCategories([])
            setErrors({
              scholarship_name: '',
              description: '',
              requirements: '',
              eligibilities: '',
              benefit_categories: '',
              benefits: '',
              start_date: '',
              due_date: '',
              application_link: '',
              school_year: '',
              status: '',
              scholarship_type: '',
            })
          }
        }
      } catch (error: any) {
        setIsButtonLoading(false)
        if (error) {
          setIsSnackbarOpen(true)
          setSuccessMessage('')
          setErrorMessage(error.response.data.errors.join(', '))
          const errorMessages: { [key: string]: string } = {
            scholarship_name: error.response.data.errors
              .filter((str: string) => str.includes('Scholarship name'))
              .join(', '),
            description: error.response.data.errors
              .filter((str: string) => str.includes('Description'))
              .join(', '),
            requirements: error.response.data.errors
              .filter((str: string) => str.includes('Requirements'))
              .join(', '),
            eligibilities: error.response.data.errors
              .filter((str: string) => str.includes('Eligibilities'))
              .join(', '),
            benefits: error.response.data.errors
              .filter((str: string) => str.includes('Benefits'))
              .join(', '),
            start_date: error.response.data.errors
              .filter((str: string) => str.includes('Start date'))
              .join(', '),
            due_date: error.response.data.errors
              .filter((str: string) => str.includes('Due date'))
              .join(', '),
            application_link: error.response.data.errors
              .filter((str: string) => str.includes('Application link'))
              .join(', '),
            school_year: error.response.data.errors
              .filter((str: string) => str.includes('School year'))
              .join(', '),
            status: error.response.data.errors
              .filter((str: string) => str.includes('Status'))
              .join(', '),
            scholarship_type: error.response.data.errors
              .filter((str: string) => str.includes('Scholarship type'))
              .join(', '),
          }

          const filteredErrors: Partial<Record<string, string>> = Object.keys(
            errorMessages
          )
            .filter((key: string) => !!errorMessages[key])
            .reduce((acc: Partial<Record<string, string>>, key: string) => {
              acc[key] = errorMessages[key]
              return acc
            }, {})

          setErrors(filteredErrors as Errors)

          setErrors(filteredErrors as Errors)
        }
      }
    }
  }

  return (
    <FormGroup>
      <CustomSnackbar
        successMessage={successMessage}
        errorMessage={errorMessage}
        isSnackbarOpen={isSnackbarOpen}
        handleSetIsSnackbarOpen={(value) => setIsSnackbarOpen(value)}
      />
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
          <CustomTextfield
            label="Scholarship Name"
            error={errors.scholarship_name}
            value={scholarshipName}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setScholarshipName(e.target.value)
            }
            placeholder="e.g. Excellence in Science Scholarship"
          />
          <CustomTextfield
            label="Scholarship Description"
            multiline={true}
            rows={4}
            error={errors.description}
            value={description}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            placeholder="e.g. The Excellence in Science Scholarship aims to support outstanding students who demonstrate exceptional academic achievement and a passion for scientific inquiry."
          />
          <CustomTextfield
            label="Requirements"
            multiline={true}
            error={errors.requirements}
            value={requirements}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleRequirementChange(e)
            }
            placeholder="e.g. Applicants must have a minimum GPA of 3.5 on a 4.0 scale, provide two letters of recommendation from science teachers or professors, and submit a personal statement outlining their academic and career goals in the field of science."
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <CustomTextfield
              label="Benefits"
              multiline={true}
              error={errors.benefits}
              value={benefits}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleBenefitChange(e)
              }
              placeholder="e.g. The scholarship provides a one-time award of P25000 to be used towards tuition, books, or other educational expenses."
            />
            <FormGroup
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {benefitCategories?.map((category) => (
                <div key={category.id} style={{ width: '50%' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          !!checkedCategories && checkedCategories.length > 0
                            ? checkedCategories.some(
                                (c) => c.id === category.id
                              )
                            : false
                        }
                        onChange={handleBenefitCategoryToggle(category.id)}
                      />
                    }
                    label={category.category_name}
                  />
                </div>
              ))}
            </FormGroup>
            <HelperText
              error={errors.benefit_categories ? errors.benefit_categories : ''}
            />
          </Box>

          <CustomTextfield
            label="Eligibility"
            multiline={true}
            error={errors.eligibilities}
            value={eligibilities}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleEligibilityChange(e)
            }
            placeholder="e.g. Open to high school seniors or college freshmen and sophomores pursuing a degree in a scientific discipline."
          />
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
            <HelperText error={errors.scholarship_type} />
          </Box>
          <Box sx={{ width: '100%' }}>
            <CustomTextfield
              label="Application link"
              multiline={true}
              error={errors.application_link}
              value={applicationLink}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setApplicationLink(e.target.value)
              }
              placeholder="e.g. www.excellenceinsciencescholarship.org"
            />
            <Typography variant="subtitle1">
              {applicationLink
                ? 'This is the link for students to apply.'
                : 'Please provide the link or the email address where students can apply for your scholarship.'}
            </Typography>
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
              <HelperText error={errors.start_date} />
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
              <HelperText error={errors.due_date} />
            </Box>
            <CustomTextfield
              label="School year"
              error={errors.school_year}
              value={schoolYear}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSchoolYear(e.target.value)
              }
              placeholder="e.g. 2024-2025"
              styles={{ padding: '20px' }}
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
                border: errors.status
                  ? '1px solid red'
                  : '1px solid var(--primary-color)',
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
            <HelperText error={errors.status} />
          </Box>
          <CTAButton
            handleClick={handleSubmit}
            label="Save Scholarship"
            loading={isButtonLoading}
          />
        </Box>
      </Container>
    </FormGroup>
  )
}

export default ScholarshipEditorPage
