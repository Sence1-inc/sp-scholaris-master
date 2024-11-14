class AddNotesToScholarshipApplications < ActiveRecord::Migration[7.1]
  def change
    add_column :scholarship_applications, :notes, :text, null: true
  end
end
