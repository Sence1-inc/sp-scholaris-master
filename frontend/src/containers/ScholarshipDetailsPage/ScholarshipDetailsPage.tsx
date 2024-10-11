import { CloudUpload } from '@mui/icons-material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Modal,
  styled,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import CTAButton from '../../components/CustomButton/CTAButton'
import CustomTextfield from '../../components/CutomTextfield/CustomTextfield'
import HelperText from '../../components/HelperText/HelperText'
import TextLoading from '../../components/Loading/TextLoading'
import { PROVIDER_TYPE } from '../../constants/constants'
import { useSnackbar } from '../../context/SnackBarContext'
import useGetScholarshipData from '../../hooks/useGetScholarshipData'
import ProviderProfile from '../../public/images/pro-profile.png'
import { initializeScholarshipApplicationForm } from '../../redux/reducers/ScholarshipApplicationFormReducer'
import { initializeScholarshipData } from '../../redux/reducers/ScholarshipDataReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { ScholarshipData } from '../../redux/types'
import { formattedDate } from '../StudentDashboardPage/StudentDashboardPage'
import './ScholarshipDetailsPage.css'

interface Results {
  scholarshipData: ScholarshipData
}

interface ScholarshipDataResultsPageProps {
  isASection: boolean
}

type Errors = {
  student_email: string
  student_name: string
  user_message: string
  pdf_file: string
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

export const ScholarshipDetailsPage: React.FC<
  ScholarshipDataResultsPageProps
> = () => {
  const { showMessage } = useSnackbar()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.persistedReducer.user)
  const { getScholarshipData } = useGetScholarshipData()
  const applicationDetails = useAppSelector(
    (state) => state.persistedReducer.scholarshipApplicationForm
  )
  const result = useAppSelector(
    (state) => state.persistedReducer.scholarshipData
  ) as Results
  const [scholarshipData, setScholarshipData] =
    useState<ScholarshipData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [studentEmail, setStudentEmail] = useState<string>('')
  const [studentName, setStudentName] = useState<string>('')
  const [userMessage, setUserMessage] = useState<string>('')
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Errors>({
    student_email: '',
    student_name: '',
    user_message: '',
    pdf_file: '',
  })

  useEffect(() => {
    setIsLoading(true)
    if (id) {
      dispatch(
        initializeScholarshipApplicationForm({
          ...applicationDetails,
          provider_id: Number(id),
        })
      )
      getScholarshipData(id)
      setIsLoading(false)
    }

    // eslint-disable-next-line
  }, [id])

  useEffect(() => {
    if (applicationDetails.student_email) {
      setStudentEmail(applicationDetails.student_email)
    }

    if (applicationDetails.student_name) {
      setStudentName(applicationDetails.student_name)
    }

    if (applicationDetails.user_message) {
      setUserMessage(applicationDetails.user_message)
    }

    if (applicationDetails.pdf_file) {
      setPdfFile(applicationDetails.pdf_file)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setScholarshipData(result.scholarshipData)
    if (
      Object.keys(result.scholarshipData).length > 0 &&
      !result.scholarshipData.scholarship_name
    ) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
    // eslint-disable-next-line
  }, [result.scholarshipData])

  const getDate = (date: string): string => {
    const parseDate = new Date(Date.parse(date))
    const year = parseDate.getFullYear()
    const month = parseDate.getMonth() + 1
    const day = parseDate.getDate()

    const format = (number: number, count: number) => {
      let str = number.toString()
      let numCount = count - str.length
      for (let i = 0; i < numCount; i++) {
        str = '0' + str
      }

      return str
    }

    return `${format(month, 2)}-${format(day, 2)}-${year}`
  }

  const handleApply = async () => {
    const validationConditions = [
      {
        condition: !studentEmail,
        field: 'student_email',
        message: 'Please provide your valid email.',
      },
      {
        condition: !studentName,
        field: 'student_name',
        message: 'Please provide your name.',
      },
      {
        condition: !userMessage,
        field: 'user_message',
        message: 'Please provide your message to the provider.',
      },
      {
        condition: pdfFile && pdfFile.type !== 'application/pdf',
        field: 'pdf_file',
        message: 'Please provide a PDF file.',
      },
    ]

    const errorMessages = validationConditions
      .filter(({ condition }) => condition)
      .reduce((acc: any, item) => {
        acc[item.field] = item.message
        return acc
      }, {})

    const hasErrors = Object.keys(errorMessages).length > 0

    if (hasErrors) {
      showMessage('Please fill in the required details.', 'error')
      setErrors({ ...errors, ...errorMessages })
    } else {
      const formData = new FormData()
      formData.append('user_message', userMessage)
      formData.append('scholarship_id', result.scholarshipData.id)
      formData.append('student_name', studentName)
      formData.append('student_email', studentEmail)

      if (pdfFile) {
        formData.append('pdf_file', pdfFile)
      }

      try {
        setIsLoading(true)
        const response = await axiosInstance.post(
          '/api/v1/scholarship_applications/send_email',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        showMessage(response.data.message, 'success')
        setStudentEmail('')
        setStudentName('')
        setUserMessage('')
        setPdfFile(null)
        dispatch(
          initializeScholarshipApplicationForm({
            provider_id: null,
            student_email: '',
            student_name: '',
            user_message: '',
            pdf_file: null,
          })
        )
        setIsLoading(false)
        setErrors({
          student_email: '',
          student_name: '',
          user_message: '',
          pdf_file: '',
        })
      } catch (error: any) {
        showMessage(error.response?.data?.message ?? 'Email not sent.', 'error')
        if (
          error.response &&
          error.response.data &&
          Array.isArray(error.response.data.details)
        ) {
          error.response.data.details.forEach((errorMessage: string) => {
            if (errorMessage.includes('Student email')) {
              errors.student_email = errorMessage
            } else if (errorMessage.includes('Student name')) {
              errors.student_name = errorMessage
            } else if (errorMessage.includes('User message')) {
              errors.user_message = errorMessage
            } else if (errorMessage.includes('file')) {
              errors.pdf_file = errorMessage
            }
          })
          setErrors(errors)
        }
      }
    }
  }

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: 10 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <section id="details">
        <div className="container" style={{ padding: '80px 20px' }}>
          <aside id="aside">
            <Button
              id="back-to-search"
              onClick={() => {
                dispatch(initializeScholarshipData({}))
                navigate(-1)
              }}
              sx={{
                color: 'secondary.main',
                fontSize: '1.2rem',
                fontWeight: 700,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <ArrowBackIosIcon sx={{ fontSize: '1.2rem' }} /> Back to Search
              Results
            </Button>
          </aside>
          {/* <Alert severity="warning" sx={{ marginBottom: '40px' }}>
            All scholarship listings are currently test data and not actual
            listings. We’ll be updating them with real data soon, so stay tuned!
          </Alert> */}
          {scholarshipData && (
            <div className="details-card">
              {formattedDate(scholarshipData.due_date).isBefore(dayjs()) && (
                <Alert severity="error" sx={{ marginBottom: '20px' }}>
                  Application is now closed
                </Alert>
              )}
              <h3 className="title3">
                {scholarshipData.scholarship_name || <TextLoading />}
              </h3>
              <p
                style={{
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1,
                  marginBottom: '20px',
                }}
              >
                Listing ID: {scholarshipData.listing_id}
              </p>
              <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.3 }}>
                {scholarshipData.description}
              </p>
              {scholarshipData.benefits &&
                scholarshipData.benefits.length > 0 && (
                  <div className="details-section">
                    <h4 className="title4">Benefits</h4>
                    {scholarshipData.benefits.map((benefit: any) => (
                      <p
                        style={{ whiteSpace: 'pre-wrap', lineHeight: 1.3 }}
                        key={benefit.id}
                      >
                        {benefit.benefit_name}
                      </p>
                    ))}
                  </div>
                )}
              {scholarshipData.requirements &&
                scholarshipData.requirements.length > 0 && (
                  <div className="details-section">
                    <h4 className="title4">Requirements</h4>
                    {scholarshipData.requirements.map((requirement: any) => (
                      <p
                        style={{ whiteSpace: 'pre-wrap', lineHeight: 1.3 }}
                        key={requirement.id}
                      >
                        {requirement.requirements_text}
                      </p>
                    ))}
                  </div>
                )}
              {scholarshipData.eligibilities &&
                scholarshipData.eligibilities.length > 0 && (
                  <div className="details-section">
                    <h4 className="title4">Eligibilities</h4>
                    {scholarshipData.eligibilities.map((elibility: any) => (
                      <p
                        style={{ whiteSpace: 'pre-wrap', lineHeight: 1.3 }}
                        key={elibility.id}
                      >
                        {elibility.eligibility_text}
                      </p>
                    ))}
                  </div>
                )}
              <div className="details-section details-columns">
                <div className="details-column">
                  <h5 className="title4">Application Start Date</h5>
                  <p className="bordered">
                    {getDate(scholarshipData.start_date)}
                  </p>
                </div>
                <div className="details-column">
                  <h5 className="title4">Application End Date</h5>
                  <p className="bordered">
                    {getDate(scholarshipData.due_date)}
                  </p>
                </div>
                <div className="details-column">
                  <h5 className="title4">School Year</h5>
                  <p className="bordered">
                    S. Y. : {scholarshipData.school_year}
                  </p>
                </div>
              </div>
              <div className="details-section">
                {!user.email_address ||
                (user &&
                  user.email_address &&
                  user.role.role_name !== PROVIDER_TYPE) ? (
                  <CTAButton
                    handleClick={() => setIsModalOpen(true)}
                    label="Apply"
                    loading={false}
                    styles={{ fontSize: '24px' }}
                  />
                ) : (
                  <></>
                )}
                <Modal
                  open={isModalOpen}
                  onClose={() => {
                    setIsModalOpen(false)
                    setErrors({
                      student_email: '',
                      student_name: '',
                      user_message: '',
                      pdf_file: '',
                    })
                  }}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    sx={{
                      width: { xs: '90vw', md: '80vw' },
                      maxHeight: '94vh',
                      margin: '20px auto',
                      backgroundColor: 'background.default',
                      padding: '20px 20px',
                      borderRadius: '24px',
                      overflowY: 'auto',
                      overflowX: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <CustomTextfield
                      label="Student Email"
                      error={errors.student_email}
                      value={studentEmail}
                      handleChange={(
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setStudentEmail(e.target.value)
                        dispatch(
                          initializeScholarshipApplicationForm({
                            ...applicationDetails,
                            student_email: studentEmail,
                          })
                        )
                      }}
                      placeholder="e.g. student@example.com"
                      styles={{
                        padding: { xs: '12px', md: '17px', marginTop: '10px' },
                      }}
                    />
                    <CustomTextfield
                      label="Student Name"
                      error={errors.student_name}
                      value={studentName}
                      handleChange={(
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setStudentName(e.target.value)
                        dispatch(
                          initializeScholarshipApplicationForm({
                            ...applicationDetails,
                            student_name: studentName,
                          })
                        )
                      }}
                      placeholder="e.g. Jane Doe"
                      styles={{
                        padding: { xs: '12px', md: '17px', marginTop: '10px' },
                      }}
                    />
                    <CustomTextfield
                      label="Message to Provider"
                      error={errors.user_message}
                      value={userMessage}
                      handleChange={(
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setUserMessage(e.target.value)
                        dispatch(
                          initializeScholarshipApplicationForm({
                            ...applicationDetails,
                            user_message: userMessage,
                          })
                        )
                      }}
                      multiline={true}
                      rows={4}
                      placeholder="e.g. I am writing to express my sincere interest in the [Scholarship Name] as it aligns perfectly with my academic and career goals. As a dedicated student with a passion for [Your Field or Major], I have consistently demonstrated my commitment through my academic achievements and extracurricular involvement. This scholarship would not only alleviate the financial burden of my education but also empower me to further pursue my ambitions and contribute meaningfully to my community. I am eager to seize this opportunity and make a positive impact through the support of your esteemed scholarship."
                      styles={{
                        padding: { xs: '5px', md: '16px' },
                        marginTop: '10px',
                      }}
                    />
                    <Box>
                      <Button
                        sx={{
                          backgroundColor: 'primary',
                          fontSize: '0.9rem',
                          width: '100%',
                        }}
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUpload />}
                      >
                        <span
                          style={{
                            inlineSize: '95%',
                            overflowWrap: 'break-word',
                          }}
                        >
                          {pdfFile
                            ? pdfFile.name
                            : 'Upload pdf file (optional)'}
                        </span>
                        <VisuallyHiddenInput
                          type="file"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            if (event.target.files) {
                              setPdfFile(event.target.files[0])
                              dispatch(
                                initializeScholarshipApplicationForm({
                                  ...applicationDetails,
                                  pdf_file: event.target.files[0],
                                })
                              )
                            }
                          }}
                          accept=".pdf"
                        />
                      </Button>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontSize: '0.8rem', lineHeight: '1.25', mt: 1 }}
                      >
                        * You can upload your credentials, grades,
                        recommendation letter, or any relevant pdf file for your
                        scholarship application. For multiple documents, save it
                        in a single pdf file.
                      </Typography>
                      <HelperText error={errors.pdf_file} />
                    </Box>

                    <CTAButton
                      loading={isLoading}
                      handleClick={handleApply}
                      label="Apply"
                      styles={{
                        fontSize: '1.20rem',
                        padding: { xs: '14px', md: '20px' },
                      }}
                    />
                  </Box>
                </Modal>
              </div>
            </div>
          )}
          {scholarshipData && scholarshipData.scholarship_provider && (
            <div className="profiles-card">
              <div className="profiles-column">
                <div className="profiles-image">
                  <img src={ProviderProfile} alt="" />
                </div>
                <div className="profiles-details">
                  <h3 className="title3">
                    {scholarshipData.scholarship_provider.provider_name}
                  </h3>
                  <p style={{ marginBottom: '20px' }}>
                    {
                      scholarshipData.scholarship_provider
                        .scholarship_provider_profile?.description
                    }
                  </p>
                  {scholarshipData.scholarship_provider.provider_link && (
                    // eslint-disable-next-line
                    <a
                      target="_blank"
                      style={{ color: '#002147', marginTop: '20px' }}
                      href={`https://${scholarshipData.scholarship_provider.provider_link}`}
                    >
                      More about{' '}
                      {scholarshipData.scholarship_provider.provider_name}
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
          <Typography variant="subtitle1" sx={{ margin: '30px 0' }}>
            For Scholarship Granting Organizations:
            <br />
            If you are a scholarship granting organization and would like to
            request edits to the listed data, please contact us with the title
            and details page link of the relevant scholarship at
            support-scholaris@sence1.com
          </Typography>
        </div>
      </section>
      <section id="details">
        <div className="container"></div>
      </section>
    </>
  )
}
