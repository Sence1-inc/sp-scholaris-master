import { ThumbUp } from '@mui/icons-material'
import {
  Box,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { STUDENT_TYPE } from '../../constants/constants'
import {
  SurveyQuestion,
  SurveyResponse,
} from '../../containers/SurveyPage/SurveyPage'
import { useAppSelector } from '../../redux/store'
import { SubscriberData } from '../Newsletter/Newsletter'

interface SurveyProps {
  surveyQuestions: SurveyQuestion[] | null
  surveyResponses: SurveyResponse
  handleChange: (
    value: string,
    field: string,
    survey_question_id?: number
  ) => void
  subscriber: { email: string; user_type: string }
  pathname: string
}

const Survey: React.FC<SurveyProps> = ({
  surveyQuestions,
  surveyResponses,
  handleChange,
}) => {
  const subscriber: SubscriberData = useAppSelector(
    (state) => state.persistedReducer.subscriber
  )
  const user = useAppSelector((state) => state.persistedReducer.user)
  const [checkedChoices, setCheckedChoices] = useState<any>({})

  const classifications = ['parent', 'guardian', 'teacher', 'student']

  useEffect(() => {
    if (user.email_address) {
      handleChange(user.email_address, 'email')
    }
  }, [])

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    question: SurveyQuestion,
    choice: string
  ) => {
    if (e.target.checked) {
      if (
        checkedChoices &&
        Object.keys(checkedChoices).includes(String(question.id))
      ) {
        const data = checkedChoices[question.id]
        setCheckedChoices({
          ...checkedChoices,
          ...{
            [question.id]: [...data, e.target.name.trim()],
          },
        })

        handleChange(
          [data, e.target.name.trim()].toString(),
          'responses',
          question.id
        )
      } else {
        setCheckedChoices({
          ...checkedChoices,
          ...{
            [question.id]: [e.target.name.trim()],
          },
        })
        handleChange(e.target.name.trim(), 'responses', question.id)
      }
    } else {
      const data = checkedChoices[question.id]
      const filteredData = data?.filter((item: string) => item !== choice)

      setCheckedChoices({
        ...checkedChoices,
        ...{ [question.id]: filteredData },
      })
      handleChange(filteredData.toString(), 'responses', question.id)
    }
  }

  return (
    <>
      <Typography
        variant="h2"
        sx={{ fontWeight: '700', textAlign: 'center', marginTop: '20px' }}
      >
        Welcome to the Scholaris Survey!
      </Typography>
      <Typography variant="body1">
        Scholaris is dedicated to revolutionizing the scholarship application
        process, and your insights are invaluable in shaping the future of
        educational opportunities. Your participation in this survey will
        contribute significantly to our understanding of how to streamline and
        improve scholarship application processes. We appreciate your time and
        effort in providing feedback. Together, we can make accessing
        scholarships easier and more efficient for students everywhere. Thank
        you for joining us on this journey to enhance educational opportunities
        for all.
      </Typography>
      <Container sx={{ padding: '0!important' }}>
        <Typography
          variant="h6"
          sx={{
            marginBottom: '10px',
            textAlign: 'start',
          }}
        >
          What is your email?
        </Typography>
        <TextField
          required
          size="medium"
          inputProps={{
            sx: { fontSize: '20px', color: 'var(--primary-color)' },
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e.target.value, 'email')
          }
          value={
            user && user.email_address
              ? user.email_address
              : surveyResponses.email
          }
        />
      </Container>
      <Container sx={{ padding: '0!important' }}>
        <Typography
          variant="h6"
          sx={{
            marginBottom: '10px',
            textAlign: 'start',
          }}
        >
          What is your classification?
        </Typography>
        {subscriber.user_type === STUDENT_TYPE ? (
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={surveyResponses.classification}
            sx={{ textAlign: 'left' }}
            label="Classification"
            onChange={(e: any) =>
              handleChange(e.target.value, 'classification')
            }
          >
            {classifications.map((classification: string) => {
              return (
                <MenuItem value={classification}>{classification}</MenuItem>
              )
            })}
          </Select>
        ) : (
          <TextField
            required
            size="medium"
            inputProps={{
              sx: { fontSize: '20px', color: 'var(--primary-color)' },
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value, 'classification')
            }
            value={surveyResponses.classification}
          />
        )}
      </Container>
      {surveyQuestions?.map((question: SurveyQuestion, index: number) => (
        <Container key={index} sx={{ padding: '0!important' }}>
          <Typography
            variant="h6"
            sx={{
              marginBottom: '10px',
              textAlign: 'start',
              whiteSpace: 'pre-line',
            }}
          >
            {question['question_text']}
          </Typography>
          {question['input_type'].includes('rating') && (
            <Box
              sx={{
                display: 'flex',
                gap: '40px',
                alignItems: 'center',
                justifyContent: 'flex-start',
                margin: '10px 0',
              }}
            >
              <Typography variant="body1" color="primary">
                Rating:{' '}
              </Typography>
              <Rating
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: 'secondary.main',
                  },
                  '& .MuiRating-iconHover': {
                    color: 'secondary.main',
                  },
                }}
                name="text-feedback"
                onChange={(e: any) => {
                  handleChange(e.target.value, 'rating', question.id)
                }}
                precision={1}
                icon={<ThumbUp fontSize="small" sx={{ margin: '0 4px' }} />}
                emptyIcon={
                  <ThumbUp fontSize="small" sx={{ margin: '0 4px' }} />
                }
              />
            </Box>
          )}
          {question['input_type'].includes('textfield') && (
            <TextField
              required={question['is_required']}
              multiline
              minRows={2}
              size="medium"
              inputProps={{
                sx: { fontSize: '20px', color: 'var(--primary-color)' },
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, `responses`, question.id)
              }
              value={
                surveyResponses.responses.find(
                  (response) => response.survey_question_id === question.id
                )?.answer || ''
              }
            />
          )}
          {question['input_type'].includes('checkbox') && (
            <FormControl component="fieldset" variant="standard" fullWidth>
              <FormGroup
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}
              >
                {question['choices']
                  .split(',')
                  .map((choice: string, index: number) => {
                    return (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleCheckboxChange(e, question, choice)}
                            name={choice}
                            sx={{
                              color: 'var(--primary-color)',
                              '&.Mui-checked': {
                                color: 'var(--primary-color)',
                              },
                            }}
                          />
                        }
                        label={
                          <Typography variant="body1" color="primary">
                            {choice.toUpperCase()}
                          </Typography>
                        }
                      />
                    )
                  })}
              </FormGroup>
            </FormControl>
          )}
        </Container>
      ))}
    </>
  )
}

export default Survey
