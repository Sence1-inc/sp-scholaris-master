class AddStatusToScholarshipApplications < ActiveRecord::Migration[7.1]
  def change
    add_column :scholarship_applications, :status, :integer, null: false, default: 1
  end
end
