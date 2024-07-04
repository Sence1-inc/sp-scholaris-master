class AddIsRequiredToSurveyQuestions < ActiveRecord::Migration[7.1]
  def change
    add_column :survey_questions, :is_required, :boolean
  end
end
