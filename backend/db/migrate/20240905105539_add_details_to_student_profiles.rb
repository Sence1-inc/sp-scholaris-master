class AddDetailsToStudentProfiles < ActiveRecord::Migration[7.1]
  def change
    add_column :student_profiles, :age, :integer
    add_column :student_profiles, :nationality, :string
    add_column :student_profiles, :gender, :string
    add_column :student_profiles, :state, :string
  end
end
