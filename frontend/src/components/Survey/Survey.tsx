import {
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import { STUDENT_TYPE } from '../../constants/constants'
import {
  SurveyQuestion,
  SurveyResponse,
} from '../../containers/SurveyPage/SurveyPage'
import { useAppSelector } from '../../redux/store'
import { ctaButtonStyle } from '../../styles/globalStyles'

interface SurveyProps {
  surveyQuestions: SurveyQuestion[] | null
  surveyResponses: SurveyResponse
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
    survey_question_id?: number
  ) => void
  handleSubmit: () => void
  subscriber: { email: string; user_type: string }
  pathname: string
  message: string
}

const Survey: React.FC<SurveyProps> = ({
  surveyQuestions,
  surveyResponses,
  handleChange,
  handleSubmit,
  message,
}) => {
  const subscriber = useAppSelector((state) => state.subscriber)

  const classifications = ['parent', 'guardian', 'teacher', 'student']

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
            handleChange(e, 'email')
          }
          value={surveyResponses.email}
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
            onChange={(e: any) => handleChange(e, 'classification')}
          >
            {classifications.map((classification: string) => {
              return (
                <MenuItem value="classification">{classification}</MenuItem>
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
              handleChange(e, 'classification')
            }
            value={surveyResponses.classification}
          />
        )}
      </Container>
      {surveyQuestions?.map((questionText, index) => (
        <Container key={index} sx={{ padding: '0!important' }}>
          <Typography
            variant="h6"
            sx={{
              marginBottom: '10px',
              textAlign: 'start',
            }}
          >
            {questionText['question_text']}
          </Typography>
          <TextField
            required
            multiline
            minRows={2}
            size="medium"
            inputProps={{
              sx: { fontSize: '20px', color: 'var(--primary-color)' },
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e, `responses`, questionText.id)
            }
            value={
              surveyResponses.responses.find(
                (response) => response.survey_question_id === questionText.id
              )?.answer || ''
            }
          />
        </Container>
      ))}
      {message && <Typography color="error">{message}</Typography>}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
        sx={{ ...ctaButtonStyle, marginBottom: '60px' }}
      >
        Submit
      </Button>
    </>
  )
}

export default Survey
