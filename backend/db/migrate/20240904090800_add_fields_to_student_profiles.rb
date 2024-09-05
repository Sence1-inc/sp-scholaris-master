class AddFieldsToStudentProfiles < ActiveRecord::Migration[7.1]
  def change
    add_column :student_profiles, :secondary_school_name, :string
    add_column :student_profiles, :secondary_school_year, :string
    add_column :student_profiles, :secondary_school_address, :string
    add_column :student_profiles, :secondary_school_phone_number, :string
    add_column :student_profiles, :secondary_school_awards, :text
    add_column :student_profiles, :secondary_school_organizations, :text
    add_column :student_profiles, :elementary_school_name, :string
    add_column :student_profiles, :elementary_school_year, :string
    add_column :student_profiles, :elementary_school_address, :string
    add_column :student_profiles, :elementary_school_phone_number, :string
    add_column :student_profiles, :elementary_school_awards, :text
    add_column :student_profiles, :elementary_school_organizations, :text
    add_column :student_profiles, :guardian_full_name, :string
    add_column :student_profiles, :guardian_contact_number, :string
    add_column :student_profiles, :guardian_relationship, :string
  end
end
