class AddDeletedAtToSurveyQuestions < ActiveRecord::Migration[7.1]
  def change
    add_column :survey_questions, :deleted_at, :datetime
    add_index :survey_questions, :deleted_at
  end
end
