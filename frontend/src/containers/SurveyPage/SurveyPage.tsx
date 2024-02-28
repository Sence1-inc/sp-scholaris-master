import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import './SurveyPage.css';
import axios from "axios";

interface SurveyQuestion {
  id: number;
  question_text: string;
}

const SurveyPage: React.FC = () => {
  const [surveyQuestions, setSurveyQuestions] = useState<SurveyQuestion[] | null>(null);
  const [surveyNumber, setSurveyNumber] = useState(1);
  const navigate = useNavigate();
  const textarea = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/v1/survey_questions?user_type=${'student'}`);
        setSurveyQuestions(response.data.survey_questions || []);
      } catch (error) {
        console.error("Error fetching survey questions:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    if (surveyNumber < (surveyQuestions?.length || 0)) {
      setSurveyNumber(prev => prev + 1);
      textarea.current!.value = ''
    } else {
      // Redirect to a different page when reaching the last survey question
      navigate("/thank-you-page");
    }
  }

  const currentQuestion = surveyQuestions?.find(question => question.id === surveyNumber);

  return (
    <div className="survey">
      <div className="container-1040">
        <div className="survey__header-container">
          <h2>Survey</h2>
        </div>
        {currentQuestion && (
          <>
            <p className="survey-description" key={currentQuestion.id}>{currentQuestion.question_text}</p>
            <textarea ref={textarea}></textarea>
            <Button handleClick={handleClick}>Confirm</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default SurveyPage;
