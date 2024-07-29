class AddTypeAndChoicesToSurveyQuestions < ActiveRecord::Migration[7.1]
  def change
    add_column :survey_questions, :type, :string
    add_column :survey_questions, :choices, :string
  end
end
