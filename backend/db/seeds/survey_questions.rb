survey_questions = [
  { id: 1, question_text: "Can you share how easy or difficult it is to look for scholarships?", input_type: "rating, textfield", choices: "", is_required: false, user_type: "student" },
  { id: 2, question_text: "What other platforms or means do you use to stay informed about scholarships? Please select all that apply.", input_type: "checkbox", choices: "social media, word of mouth, search engine, offered from school, offered by your professor or admin, others", is_required: false, user_type: "student" },
  { id: 3, question_text: "What are the challenges you encounter in submission and management of scholarship?", input_type: "textfield", choices: "", is_required: false, user_type: "student" },
  { id: 4, question_text: "Were you able to effectively search for scholarships through text search and filters?", input_type: "rating, textfield", choices: "", is_required: true, user_type: "student" },
  { id: 5, question_text: "What features or functionalities can we improve on? Would you also like to suggest new features or enhancements?", input_type: "textfield", choices: "", is_required: false, user_type: "student" },
  { id: 6, question_text: "How likely would you use the app to search for scholarships in the future?", input_type: "rating", choices: "", is_required: true, user_type: "student" },

  { id: 7, question_text: "Were you able to effectively search for scholarships through text search and filters?", input_type: "rating, textfield", choices: "", is_required: false, user_type: "provider" },
  { id: 8, question_text: "What platforms or means do you use to post or inform students on open scholarships? Please select all that apply.", input_type: "checkbox", choices: "social media, school websites, advertisements, word of mouth, others", is_required: false, user_type: "provider" },
  { id: 9, question_text: "What are the tools you use to manage scholarships? Please check all that apply.", input_type: "checkbox", choices: "email, spreadsheets, computer program, web application, others", is_required: false, user_type: "provider" },
  { id: 10, question_text: "What are the challenges that you encounter in posting and managing scholarships?", input_type: "textfield", choices: "", is_required: true, user_type: "provider" },
  { id: 11, question_text: "Scholaris has the following upcoming features for Scholarship Granting Organizations: \n \n- List scholarships \n- Manage scholarship applications \n- Search for your next scholar \n- Invite students to apply for your scholarship \n \nConsidering your experience in using the app and upcoming features, please rate on how probable you would be using Scholaris for scholarship management.", input_type: "rating", choices: "", is_required: false, user_type: "provider" },
  { id: 12, question_text: "What features or functionalities can we improve on? Would you also like to suggest new features or enhancements?", input_type: "textfield", choices: "", is_required: false, user_type: "provider" },
];

SurveyResponse.delete_all
SurveyQuestion.delete_all

survey_questions.each do |question|
  SurveyQuestion.create!(id: question[:id], question_text: question[:question_text], input_type: question[:input_type], choices: question[:choices], is_required: question[:is_required], user_type: question[:user_type])
end
