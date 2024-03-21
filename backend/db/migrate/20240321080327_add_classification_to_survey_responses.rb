class AddClassificationToSurveyResponses < ActiveRecord::Migration[7.1]
  def change
    add_column :survey_responses, :classification, :string
  end
end
