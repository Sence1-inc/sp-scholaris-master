import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, styled } from "@mui/material";
import axios from "axios";

interface SurveyQuestion {
  id: number;
  question_text: string;
}

const CustomTextarea = styled("textarea")({
  width: "100%",
  borderRadius: '16px',
  boxShadow: "-6px -6px 1.9px 0 rgba(0, 0, 0, 10%) inset",
  padding: "10px",
  fontSize: "18px",
  color: "#002147",
  border: "1px solid #000",
  backgroundColor: "#f3f3f3",
  height: '240px'
});

const SurveyPage: React.FC = () => {
  const [surveyQuestions, setSurveyQuestions] = useState<SurveyQuestion[] | null>(null);
  const [surveyNumber, setSurveyNumber] = useState(1);
  const navigate = useNavigate();
  const textarea = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/v1/survey_questions?user_type=${'student'}`);
        // Temporary
        setSurveyQuestions(response.data.survey_questions || []);
      } catch (error) {
        console.error("Error fetching survey questions:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    if (surveyNumber < (surveyQuestions?.length || 0)) {
      setSurveyNumber((prev) => prev + 1);
      if (textarea.current) {
        textarea.current.value = "";
      }
    } else {
      navigate("/thank-you");
    }
  };

  const currentQuestion = surveyQuestions?.find((question) => question.id === surveyNumber);

  return (
    <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", rowGap: '50px', textAlign: "center", marginBlock: "40px" }}>
        <Typography variant="h2" sx={{fontWeight: '700', textAlign: "center", marginTop: "20px"}}>Survey</Typography>
      {currentQuestion && (
        <>
          <Typography variant="body1" sx={{fontSize: '24px', color: 'var(--primary-color)'}}>
            {currentQuestion.question_text}
          </Typography>
          <CustomTextarea
            ref={textarea}
          />
          <Button variant="contained" color="primary" onClick={handleClick} sx={{borderRadius: '16px', backgroundColor: '#f36b3b', padding: '20px', marginBottom: '20px', "&:hover": {
                backgroundColor: '#d2522b', // Change to the desired hover color
              }}}>
            Confirm
          </Button>
        </>
      )}
    </Container>
  );
};

export default SurveyPage;
