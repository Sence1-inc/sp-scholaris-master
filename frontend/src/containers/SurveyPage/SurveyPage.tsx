import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, TextField } from "@mui/material";
import axios from "axios";

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
  const textarea = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/v1/survey_questions?user_type=${user_type}`);
        setSurveyQuestions(response.data.survey_questions || []);
      } catch (error) {
        console.error("Error fetching survey questions:", error);
      }
    };

    fetchData();
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
              sx={{ borderRadius: '16px', width: '100%' }}
              inputProps={{ sx: { fontSize: '20px', color: 'var(--primary-color)' } }}
            />
          </Container>
      {
        surveyQuestions?.map((questionText, index) => (
          <Container key={index} sx={{padding: '0!important'}}>
            <Typography variant="body1" sx={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '10px', textAlign: 'start' }}>
              {questionText['question_text']}
            </Typography>
            <TextField
              multiline
              minRows={2}
              size='medium'
              sx={{ borderRadius: '16px', width: '100%' }}
              inputProps={{ sx: { fontSize: '20px', color: 'var(--primary-color)' } }}
            />
          </Container>
        ))
      }
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        sx={{ borderRadius: '16px', backgroundColor: '#f36b3b', padding: '20px', marginBottom: '20px', "&:hover": { backgroundColor: '#d2522b' } }}
      >
        Confirm
      </Button>
    </Container>
  );
};

export default SurveyPage;
