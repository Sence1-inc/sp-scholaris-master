class CreateScholarshipApplications < ActiveRecord::Migration[7.1]
  def change
    create_table :scholarship_applications do |t|
      t.string :recipient_email
      t.text :user_message

      t.timestamps
    end
  end
end
