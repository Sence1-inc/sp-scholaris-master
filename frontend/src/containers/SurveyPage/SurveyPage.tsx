import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, TextField } from "@mui/material";
import axiosInstance from '../../axiosConfig';

interface SurveyQuestion {
  id: number;
  question_text: string;
}

interface SurveyPageProps {
  user_type: string;
}

const SurveyPage: React.FC<SurveyPageProps> = ({ user_type }) => {
  const [surveyQuestions, setSurveyQuestions] = useState<SurveyQuestion[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/survey_questions?user_type=${user_type}`);
        setSurveyQuestions(response.data.survey_questions || []);
      } catch (error) {
        console.error("Error fetching survey questions:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);


  const handleClick = () => {
        navigate("/thank-you");
  };

  return (
    <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", rowGap: '50px', textAlign: "center", marginBlock: "40px" }}>
      <Typography variant="h2" sx={{ fontWeight: '700', textAlign: "center", marginTop: "20px" }}>Survey</Typography>
      <Container  sx={{padding: '0!important'}}>
            <Typography variant="body1" sx={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '10px', textAlign: 'start' }}>
              What is your email?
            </Typography>
            <TextField
              size='medium'
              inputProps={{ sx: { fontSize: '20px', color: 'var(--primary-color)' } }}
              sx={{
                borderRadius: "16px",
                width: "100%",
                "& fieldset": { border: "none" },
                border: "1px solid #0E2F71",
                boxShadow: "-4px -4px 1.9px 0 rgba(0, 0, 0, 10%) inset"
              }}
            />
          </Container>
      {
        surveyQuestions?.map((questionText, index) => (
          <Container key={index} sx={{padding: '0!important'}}>
            <Typography variant="body1" sx={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '10px', textAlign: 'start' }}>
              {questionText['question_text']}
            </Typography>
            <TextField
          size="medium"
          multiline
          minRows={2}
          sx={{
            borderRadius: "16px",
            width: "100%",
            "& fieldset": { border: "none" },
            border: "1px solid #0E2F71",
            boxShadow: "-4px -4px 1.9px 0 rgba(0, 0, 0, 10%) inset"
          }}
          inputProps={{
            sx: { fontSize: "20px", color: "var(--primary-color)" },
          }}
        />
          </Container>
        ))
      }
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        sx={{ borderRadius: '16px', backgroundColor: '#f36b3b', padding: '20px', marginBottom: '60px', "&:hover": { backgroundColor: '#d2522b' } }}
      >
        Confirm
      </Button>
    </Container>
  );
};

export default SurveyPage;
