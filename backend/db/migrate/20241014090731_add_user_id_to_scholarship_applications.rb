class AddUserIdToScholarshipApplications < ActiveRecord::Migration[7.1]
  def change
    add_column :scholarship_applications, :user_id, :bigint
    add_index :scholarship_applications, :user_id
    add_foreign_key :scholarship_applications, :users
  end
end
