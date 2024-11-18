class CreateScholarshipFeedbacks < ActiveRecord::Migration[7.1]
  def change
    create_table :scholarship_feedbacks do |t|
      t.references :scholarship_provider, null: false, foreign_key: true
      t.text :feedback

      t.timestamps
      t.timestamp :deleted_at
    end
  end
end
