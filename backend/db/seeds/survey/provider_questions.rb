provider_questions = [
  { id: 1, question_text: "Could you please share how scholarships are awarded, starting from the initial idea to the final selection?" },
  { id: 2, question_text: "What are the challenges you encounter in the process of granting scholarship - from ideation to awarding?" },
  { id: 3, question_text: "What are the challenges you encounter in posting scholarship?" },
  { id: 4, question_text: "What challenges did you face while going through your posting process that you believe the app could address? Are you open to using digital ways in solving these challenges?" },
  { id: 5, question_text: "What suggestions do you have to lessen these pain points in the posting process?" },
  { id: 6, question_text: "Do you use any services to post scholarship details?" },
  { id: 7, question_text: "Could you please share the process you followed to post your scholarship?" },
  { id: 8, question_text: "What's the motivation in providing scholarships?" },
  { id: 9, question_text: "Do you think you will benefit from this scholarship pooling app?" },
  { id: 10, question_text: "How probable is it that you would utilize the upcoming application management feature? On a scale of 1 (unlikely) to 5 (very likely), please rate your inclination to use the app, where students can browse, choose, and submit scholarship applications, and providers can oversee the application process." }
];

provider_questions.each do |question|
  id = question[:id]
  existing_question = SurveyQuestion.find_by(id: id)
  
  if existing_question.nil?
    SurveyQuestion.create!(id: id, question_text: question[:question_text], user_type: "provider")
  else
    puts "Skipping question with id #{id} because it already exists."
  end
end
