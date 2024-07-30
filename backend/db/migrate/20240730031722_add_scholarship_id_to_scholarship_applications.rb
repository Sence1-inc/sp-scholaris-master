class AddScholarshipIdToScholarshipApplications < ActiveRecord::Migration[7.1]
  def change
    add_column :scholarship_applications, :scholarship_id, :bigint
    add_index :scholarship_applications, :scholarship_id
    add_foreign_key :scholarship_applications, :scholarships
  end
end
