class ChangeEmailInSurveyResponsesToNotNullable < ActiveRecord::Migration[7.1]
  def change
    change_column_null :survey_responses, :email, false
  end
end
