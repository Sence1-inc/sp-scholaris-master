class RenameTypeToInputTypeInSurveyQuestions < ActiveRecord::Migration[7.1]
  def change
    rename_column :survey_questions, :type, :input_type
  end
end
