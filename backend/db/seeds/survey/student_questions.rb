survey_questions = [
  { id: 1, question_text: "What are the keywords you use when searching for scholarships?" },
  { id: 2, question_text: "What are the challenges you encounter in searching for a scholarship?" },
  { id: 3, question_text: "How do you currently stay informed about scholarship opportunities? What methods or platforms do you use to find and apply for scholarships?" },
  { id: 4, question_text: "How do you currently evaluate the credibility and legitimacy of scholarship providers or programs? What factors do you consider to be important in assessing the authenticity of scholarships?" },
  { id: 5, question_text: "How easy/difficult is it to search for scholarships?" },
  { id: 6, question_text: "What are the challenges you encounter in submission and management of scholarship?" },
  { id: 7, question_text: "Have you ever faced any issues or obstacles in managing multiple scholarship applications or tracking the status of your applications? If yes, please elaborate." },
  { id: 8, question_text: "How do you maintain the scholarship?" },
  { id: 9, question_text: "Do you think you will benefit from this scholarship pooling app?" },
  { id: 10, question_text: "We will be releasing application management soon, where you can get updates from providers and save scholarships and apply scholarships, how likely will you use the app from 1 (never) to 5 (most likely)?" }
];

survey_questions.each do |question|
  id = question[:id]
  existing_question = SurveyQuestion.find_by(id: id)
  
  if existing_question.nil?
    SurveyQuestion.create!(id: id, question_text: question[:question_text], user_type: "student")
  else
    puts "Skipping question with id #{id} because it already exists."
  end
end
