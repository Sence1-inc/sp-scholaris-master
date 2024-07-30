class AddDeletedAtToScholarshipApplications < ActiveRecord::Migration[7.1]
  def change
    add_column :scholarship_applications, :deleted_at, :datetime, null: true
    add_index :scholarship_applications, :deleted_at
  end
end
