class ChangeDefaultValueInSurveyQuestions < ActiveRecord::Migration[7.1]
  def change
    change_column :survey_questions, :created_at, :timestamp, default: -> { 'CURRENT_TIMESTAMP' }
    change_column :survey_questions, :updated_at, :timestamp, default: -> { 'CURRENT_TIMESTAMP' }
  end
end
