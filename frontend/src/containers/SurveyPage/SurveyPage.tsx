import { ArrowBackIos, Home } from '@mui/icons-material'
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material'
import { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar'
import {
  ErrorResponse,
  SubscriberData,
  SuccessResponse,
} from '../../components/Newsletter/Newsletter'
import Survey from '../../components/Survey/Survey'
import { PROVIDER_TYPE, STUDENT_TYPE } from '../../constants/constants'
import { initializeSubscirber } from '../../redux/reducers/SubscriberReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { ctaButtonStyle } from '../../styles/globalStyles'

export interface SurveyQuestion {
  id: number
  question_text: string
  input_type: string
  choices: string
  is_required: boolean
}

interface SurveyPageProps {
  user_type: string
}

interface Response {
  survey_question_id: number
  answer: string
  rating: number | null
}

export interface SurveyResponse {
  email: string
  classification: string
  user_id?: number | null
  responses: Response[]
}

const initialSurveyResponses = {
  email: '',
  classification: '',
  responses: [
    {
      survey_question_id: 1,
      answer: '',
      rating: null,
    },
  ],
}

const SurveyPage: React.FC<SurveyPageProps> = ({ user_type }) => {
  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const subscriber = useAppSelector(
    (state) => state.persistedReducer.subscriber
  )
  const [isASubscriber, setIsASubscriber] = useState<boolean>(false)
  const [hasSubscriptionIntent, setHasSubscriptionIntent] =
    useState<boolean>(true)
  const [surveyQuestions, setSurveyQuestions] = useState<
    SurveyQuestion[] | null
  >(null)
  const [surveyResponses, setSurveyResponses] = useState<SurveyResponse>(
    initialSurveyResponses
  )
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)

  useEffect(() => {
    if (surveyQuestions) {
      const formattedQuestions = surveyQuestions.map((question) => {
        return {
          survey_question_id: question.id,
          answer: '',
          rating: null,
        }
      })

      setSurveyResponses((prevState) => {
        return { ...prevState, responses: formattedQuestions }
      })
    }
  }, [surveyQuestions])

  useEffect(() => {
    const getSurveyQuestions = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/survey_questions?user_type=${user_type}`
        )
        setSurveyQuestions(response.data.survey_questions || [])
      } catch (error) {
        if (error) {
          console.error('Error fetching survey questions:', error)
        }
      }
    }

    getSurveyQuestions()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (subscriber.email) {
      setIsASubscriber(true)

      if (pathname.includes(subscriber.user_type)) {
        setSurveyResponses((prevState) => {
          return { ...prevState, email: subscriber.email }
        })
      }
    } else {
      setIsASubscriber(false)
    }
  }, [subscriber, pathname])

  const handleSubmit = async () => {
    await axiosInstance
      .post('/api/v1/survey_responses', surveyResponses)
      .then((response) => {
        if (response.data) {
          if (hasSubscriptionIntent) {
            // eslint-disable-next-line
            handleSubscribe
          }
          dispatch(
            initializeSubscirber({
              email: '',
              user_type: '',
            })
          )
          navigate('/thank-you', {
            state: {
              user_type: pathname.includes(STUDENT_TYPE)
                ? STUDENT_TYPE
                : PROVIDER_TYPE,
            },
          })
        }
      })
      .catch((error) => {
        if (error) {
          setErrorMessage(error.response.data.error)
        }
      })
  }

  const handleChange = (
    value: number | string,
    field: string,
    survey_question_id?: number
  ) => {
    if (field === 'email') {
      setSurveyResponses((prevState) => {
        return { ...prevState, email: value as string }
      })
    }

    if (field === 'classification') {
      setSurveyResponses((prevState) => {
        return { ...prevState, classification: value as string }
      })
    }

    if (field === 'responses') {
      setSurveyResponses((prevResponses) => ({
        ...prevResponses,
        responses: prevResponses.responses.map((response) =>
          response.survey_question_id === survey_question_id
            ? { ...response, answer: value as string }
            : response
        ),
      }))
    }

    if (field === 'rating') {
      setSurveyResponses((prevResponses) => ({
        ...prevResponses,
        responses: prevResponses.responses.map((response) =>
          response.survey_question_id === survey_question_id
            ? { ...response, rating: Number(value) }
            : response
        ),
      }))
    }
  }

  const handleSubscribe: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => void = async (e) => {
    e.preventDefault()

    try {
      const user_type = pathname.includes(STUDENT_TYPE)
        ? STUDENT_TYPE
        : PROVIDER_TYPE
      const newSubscriberData: SubscriberData = {
        email: surveyResponses.email,
        user_type: user_type,
      }

      const response: AxiosResponse<SuccessResponse | ErrorResponse> =
        await axiosInstance.post(`api/v1/subscribers`, newSubscriberData)

      if (response.status === 201) {
        const successData = response.data as SuccessResponse
        dispatch(
          initializeSubscirber({
            email: successData.email,
            user_type: successData.user_type,
          })
        )
        setErrorMessage('')
      } else {
        const errorData = response.data as ErrorResponse
        setErrorMessage(
          `Error: ${errorData.error}. ${errorData.details.join(' ')}`
        )
      }
    } catch (error) {
      if (error) {
        setErrorMessage('Error creating new subscriber. Please try again.')
      }
    }
  }

  useEffect(() => {
    if (errorMessage) {
      setIsSnackbarOpen(true)
    } else {
      setIsSnackbarOpen(false)
    }
  }, [errorMessage])

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '50px',
        textAlign: 'center',
        marginBlock: '40px',
      }}
    >
      <Button
        onClick={() => {
          console.log(Cookies.get('lastVisited'))
          navigate((Cookies.get('lastVisited') as string) ?? '/')
        }}
        sx={{
          alignSelf: 'flex-start',
          color: 'secondary.main',
          fontSize: '24px',
          fontWeight: 700,
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        {!Cookies.get('lastVisited') ? (
          <>
            <Home />
            Main Menu
          </>
        ) : (
          <>
            <ArrowBackIos /> Back
          </>
        )}
      </Button>
      <CustomSnackbar
        errorMessage={errorMessage}
        isSnackbarOpen={isSnackbarOpen}
        handleSetIsSnackbarOpen={(value) => setIsSnackbarOpen(value)}
      />
      {!isASubscriber && (
        <Typography
          variant="h5"
          sx={{
            fontWeight: '700',
            textAlign: 'center',
            marginTop: '20px',
          }}
        >
          You are currently not subscribed to our newsletter
        </Typography>
      )}
      <Survey
        {...{
          surveyQuestions,
          surveyResponses,
          handleChange,
          subscriber,
          pathname,
        }}
      />
      {!isASubscriber && (
        <Box>
          <FormGroup>
            <FormControlLabel
              sx={{
                margin: 'auto',
                '& .MuiFormControlLabel-label ': {
                  fontWeight: 700,
                  fontSize: '24px',
                  color: 'var(--secondary-color)',
                },
              }}
              control={
                <Checkbox
                  sx={{
                    color: 'var(--secondary-color)',
                    '&.Mui-checked': {
                      color: 'var(--secondary-color)',
                    },
                  }}
                  defaultChecked
                />
              }
              label="I want to subscribe"
              onChange={() => setHasSubscriptionIntent(!hasSubscriptionIntent)}
            />
          </FormGroup>
          {hasSubscriptionIntent && (
            <Typography variant="body2" className="newsletter-text__small">
              By subscribing to the newsletter, I have read this form and
              understand its content and voluntarily give my consent for the
              collection, use, processing, storage and retention of my personal
              data or information to Sence1 for the purpose(s) described in the{' '}
              <Link
                style={{ color: 'var(--primary-color)' }}
                to={'/privacy-consent'}
              >
                Privacy Policy
              </Link>{' '}
              document
            </Typography>
          )}
        </Box>
      )}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
        sx={{ ...ctaButtonStyle, marginBottom: '60px' }}
      >
        Submit
      </Button>
    </Container>
  )
}

export default SurveyPage
