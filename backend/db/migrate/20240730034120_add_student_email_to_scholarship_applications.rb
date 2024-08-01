class AddStudentEmailToScholarshipApplications < ActiveRecord::Migration[7.1]
  def change
    add_column :scholarship_applications, :student_email, :string
  end
end
