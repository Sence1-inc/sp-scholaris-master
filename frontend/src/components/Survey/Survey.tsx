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
import {
  SurveyQuestion,
  SurveyResponse,
} from '../../containers/SurveyPage/SurveyPage'
import { useAppSelector } from '../../redux/store'
import CustomTextfield from '../CutomTextfield/CustomTextfield'

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
  pathname,
}) => {
  const user = useAppSelector((state) => state.persistedReducer.user)
  const [checkedChoices, setCheckedChoices] = useState<any>({})

  const classifications =
    pathname === '/student/survey'
      ? ['student', 'parent', 'guardian', 'teacher', 'school personnel']
      : [
          'school',
          'company',
          'private organization or agency',
          'government organization, group or agency',
          'non-profit organization',
          'individual',
          'foundation',
        ]

  useEffect(() => {
    if (user.email_address) {
      handleChange(user.email_address, 'email')
    }
    // eslint-disable-next-line
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
        if (choice.trim() !== 'others') {
          handleChange(
            [data, e.target.name.trim()].toString(),
            'responses',
            question.id
          )
        }
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
            sx: { fontSize: '16px', color: 'var(--primary-color)' },
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
        <Select
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={surveyResponses.classification}
          sx={{ textAlign: 'left' }}
          label="Classification"
          onChange={(e: any) => handleChange(e.target.value, 'classification')}
        >
          {classifications.map((classification: string) => {
            return <MenuItem value={classification}>{classification}</MenuItem>
          })}
        </Select>
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
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'start',
              }}
            >
              <Typography
                variant="subtitle1"
                color="primary"
                sx={{ textAlign: 'start' }}
              >
                Please consider the following scale when rating: <br />1 = Very
                Unlikely / Very Dissatisfied / Very Poor <br />2 = Unlikely /
                Dissatisfied / Poor <br />3 = Neutral / Neither Satisfied nor
                Dissatisfied / Fair <br />4 = Likely / Satisfied / Good <br />5
                = Very Likely / Very Satisfied / Excellent
              </Typography>
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
            </Box>
          )}
          {question['input_type'].includes('textfield') && (
            <TextField
              placeholder={
                question['input_type'].includes('rating')
                  ? 'Feel free to share the details or comments behind your rating.'
                  : ''
              }
              required={question['is_required']}
              multiline
              minRows={2}
              size="medium"
              sx={{ padding: '0' }}
              inputProps={{
                sx: {
                  fontSize: '16px',
                  color: 'var(--primary-color)',
                },
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
            <FormControl
              key={question.id}
              component="fieldset"
              variant="standard"
              fullWidth
            >
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
                      <Box
                        key={`${question.id}-${index}`}
                        sx={{
                          display: 'flex',
                          width: { sm: '90%', xs: '100%' },
                        }}
                      >
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
                        {choice.trim() === 'others' && (
                          <CustomTextfield
                            placeholder="Please provide details."
                            styles={{
                              padding: '6px',
                              borderRadius: '10px',
                            }}
                            handleChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const data = checkedChoices[question.id]

                              handleChange(
                                [data, e.target.value.trim()].toString(),
                                'responses',
                                question.id
                              )
                            }}
                          />
                        )}
                        {choice.trim() === 'advertisements' && (
                          <CustomTextfield
                            placeholder="Kindly specify the type of advertisement."
                            styles={{
                              padding: '6px',
                              borderRadius: '10px',
                            }}
                            handleChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const data = checkedChoices[question.id]

                              handleChange(
                                [data, e.target.value.trim()].toString(),
                                'responses',
                                question.id
                              )
                            }}
                          />
                        )}
                      </Box>
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
