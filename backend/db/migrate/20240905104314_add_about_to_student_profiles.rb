class AddAboutToStudentProfiles < ActiveRecord::Migration[7.1]
  def change
    add_column :student_profiles, :about, :string
  end
end
