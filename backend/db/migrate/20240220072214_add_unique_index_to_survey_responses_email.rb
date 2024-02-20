class AddUniqueIndexToSurveyResponsesEmail < ActiveRecord::Migration[7.1]
  def change
    add_index :survey_responses, :email, unique: true
  end
end
