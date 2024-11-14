class MakeUserIdNullableInScholarshipApplications < ActiveRecord::Migration[7.1]
  def change
    change_column_null :scholarship_applications, :user_id, true
  end
end
