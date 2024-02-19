class CreateSurveyResponses < ActiveRecord::Migration[7.1]
  def change
    create_table :survey_responses do |t|
      t.string :email, limit: 255
      t.bigint :user_id
      t.json :responses
      t.timestamps
    end

    add_foreign_key :survey_responses, :users, column: :user_id, name: 'fk_survey_responses_users'
  end
end
