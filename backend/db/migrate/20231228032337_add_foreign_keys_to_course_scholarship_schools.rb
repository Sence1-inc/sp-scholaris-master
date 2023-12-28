class AddForeignKeysToCourseScholarshipSchools < ActiveRecord::Migration[7.1]
  def change
    change_column :course_scholarship_schools, :scholarship_id, :bigint
    change_column :course_scholarship_schools, :school_id, :bigint
    change_column :course_scholarship_schools, :course_id, :bigint

    add_foreign_key :course_scholarship_schools, :scholarships, column: :scholarship_id, name: 'fk_course_scholarship_schools_scholarships'
    add_foreign_key :course_scholarship_schools, :schools, column: :school_id, name: 'fk_course_scholarship_schools_schools'
  end
end
