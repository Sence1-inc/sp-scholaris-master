class ChangeDefaultValueInSurveyResponses < ActiveRecord::Migration[7.1]
  def change
    change_column :survey_responses, :created_at, :timestamp, default: -> { 'CURRENT_TIMESTAMP' }
    change_column :survey_responses, :updated_at, :timestamp, default: -> { 'CURRENT_TIMESTAMP' }
  end
end
