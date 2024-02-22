class CreateSurveyQuestions < ActiveRecord::Migration[7.1]
  def change
    create_table :survey_questions do |t|
      t.text :question_text, null: false
      t.string :user_type, null: false
      t.timestamps
    end
  end
end