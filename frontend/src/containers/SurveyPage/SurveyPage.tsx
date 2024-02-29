import { Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig";

interface SurveyQuestion {
  id: number;
  question_text: string;
}

interface SurveyPageProps {
  user_type: string;
}

interface Response {
  survey_question_id: number;
  answer: string;
}

interface SurveyResponse {
  email: string;
  user_id?: number;
  responses: Response[];
}

const initialResponses = {
  email: "",
  responses: [
    {
      survey_question_id: 1,
      answer: "",
    },
    {
      survey_question_id: 2,
      answer: "",
    },
    {
      survey_question_id: 3,
      answer: "",
    },
    {
      survey_question_id: 4,
      answer: "",
    },
    {
      survey_question_id: 5,
      answer: "",
    },
    {
      survey_question_id: 6,
      answer: "",
    },
    {
      survey_question_id: 7,
      answer: "",
    },
    {
      survey_question_id: 8,
      answer: "",
    },
    {
      survey_question_id: 9,
      answer: "",
    },
    {
      survey_question_id: 10,
      answer: "",
    },
  ],
};

const SurveyPage: React.FC<SurveyPageProps> = ({ user_type }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const [surveyQuestions, setSurveyQuestions] = useState<
    SurveyQuestion[] | null
  >(null);
  const [surveyResponses, setSurveyResponses] =
    useState<SurveyResponse>(initialResponses);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/survey_questions?user_type=${user_type}`
        );
        setSurveyQuestions(response.data.survey_questions || []);
      } catch (error) {
        console.error("Error fetching survey questions:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async () => {
    await axiosInstance
      .post("/api/v1/survey_responses", surveyResponses)
      .then((response) => {
        console.log(response);
        if (response.data) {
          navigate("/thank-you");
        }
      })
      .catch((error) => {
        setMessage(error.response.data.error);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    survey_question_id?: number
  ) => {
    if (field === "email") {
      setSurveyResponses((prevState) => {
        return { ...prevState, email: e.target.value };
      });
    }

    if (field === "responses") {
      setSurveyResponses((prevResponses) => ({
        ...prevResponses,
        responses: prevResponses.responses.map((response) =>
          response.survey_question_id === survey_question_id
            ? { ...response, answer: e.target.value }
            : response
        ),
      }));
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "50px",
        textAlign: "center",
        marginBlock: "40px",
      }}
    >
      <Typography
        variant="h2"
        sx={{ fontWeight: "700", textAlign: "center", marginTop: "20px" }}
      >
        Survey
      </Typography>
      <Container sx={{ padding: "0!important" }}>
        <Typography
          variant="body1"
          sx={{
            fontSize: "24px",
            color: "var(--primary-color)",
            marginBottom: "10px",
            textAlign: "start",
          }}
        >
          What is your email?
        </Typography>
        <TextField
          size="medium"
          sx={{
            borderRadius: "16px",
            width: "100%",
            "& fieldset": { border: "none" },
            border: "1px solid #0E2F71",
            boxShadow: "-4px -4px 1.9px 0 rgba(0, 0, 0, 10%) inset",
          }}
          inputProps={{
            sx: { fontSize: "20px", color: "var(--primary-color)" },
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, "email")
          }
          value={surveyResponses.email}
        />
      </Container>
      {surveyQuestions?.map((questionText, index) => (
        <Container key={index} sx={{ padding: "0!important" }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: "24px",
              color: "var(--primary-color)",
              marginBottom: "10px",
              textAlign: "start",
            }}
          >
            {questionText["question_text"]}
          </Typography>
          <TextField
            multiline
            minRows={2}
            size="medium"
            sx={{
              borderRadius: "16px",
              width: "100%",
              "& fieldset": { border: "none" },
              border: "1px solid #0E2F71",
              boxShadow: "-4px -4px 1.9px 0 rgba(0, 0, 0, 10%) inset",
            }}
            inputProps={{
              sx: { fontSize: "20px", color: "var(--primary-color)" },
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e, `responses`, questionText.id)
            }
            value={
              surveyResponses.responses.find(
                (response) => response.survey_question_id === questionText.id
              )?.answer || ""
            }
          />
        </Container>
      ))}
      {message && <Typography sx={{ color: "red" }}>{message}</Typography>}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{
          borderRadius: "16px",
          backgroundColor: "#f36b3b",
          padding: "20px",
          marginBottom: "60px",
          "&:hover": { backgroundColor: "#d2522b" },
        }}
      >
        Submit
      </Button>
    </Container>
  );
};

export default SurveyPage;
