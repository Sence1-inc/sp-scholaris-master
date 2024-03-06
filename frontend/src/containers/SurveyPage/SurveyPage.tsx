import {
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material'
import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import {
  ErrorResponse,
  SubscriberData,
  SuccessResponse,
} from '../../components/Newsletter/Newsletter'
import Survey from '../../components/Survey/Survey'
import { PROVIDER_TYPE, STUDENT_TYPE } from '../../constants/constants'
import { initializeSubscirber } from '../../redux/reducers/SubscriberReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'

export interface SurveyQuestion {
  id: number
  question_text: string
}

interface SurveyPageProps {
  user_type: string
}

interface Response {
  survey_question_id: number
  answer: string
}

export interface SurveyResponse {
  email: string
  user_id?: number
  responses: Response[]
}

const initialSurveyResponses = {
  email: '',
  responses: [
    {
      survey_question_id: 1,
      answer: '',
    },
  ],
}

const SurveyPage: React.FC<SurveyPageProps> = ({ user_type }) => {
  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const subscriber = useAppSelector((state) => state.subscriber)
  const [isASubscriber, setIsASubscriber] = useState<boolean>(false)
  const [hasSubscriptionIntent, setHasSubscriptionIntent] =
    useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [surveyQuestions, setSurveyQuestions] = useState<
    SurveyQuestion[] | null
  >(null)
  const [surveyResponses, setSurveyResponses] = useState<SurveyResponse>(
    initialSurveyResponses
  )
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (surveyQuestions) {
      const formattedQuestions = surveyQuestions.map((question) => {
        return {
          survey_question_id: question.id,
          answer: '',
        }
      })

      setSurveyResponses((prevState) => {
        return { ...prevState, responses: formattedQuestions }
      })
    }
  }, [surveyQuestions])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/survey_questions?user_type=${user_type}`
        )
        setSurveyQuestions(response.data.survey_questions || [])
      } catch (error) {
        console.error('Error fetching survey questions:', error)
      }
    }

    fetchData()
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
          navigate('/thank-you')
        }
      })
      .catch((error) => {
        setMessage(error.response.data.error)
      })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    survey_question_id?: number
  ) => {
    if (field === 'email') {
      setSurveyResponses((prevState) => {
        return { ...prevState, email: e.target.value }
      })
    }

    if (field === 'responses') {
      setSurveyResponses((prevResponses) => ({
        ...prevResponses,
        responses: prevResponses.responses.map((response) =>
          response.survey_question_id === survey_question_id
            ? { ...response, answer: e.target.value }
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
      setErrorMessage('Error creating new subscriber. Please try again.')
    }
  }

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
      {!isASubscriber && (
        <>
          {errorMessage && (
            <Typography color="error" variant="body2">
              {errorMessage}
            </Typography>
          )}
          <Typography
            variant="h5"
            sx={{ fontWeight: '700', textAlign: 'center', marginTop: '20px' }}
          >
            You are currently not subscribed to our newsletter
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
                onChange={() =>
                  setHasSubscriptionIntent(!hasSubscriptionIntent)
                }
              />
            </FormGroup>
          </Typography>
        </>
      )}
      <Survey
        {...{
          surveyQuestions,
          surveyResponses,
          handleChange,
          handleSubmit,
          subscriber,
          pathname,
          message,
        }}
      />
    </Container>
  )
}

export default SurveyPage
