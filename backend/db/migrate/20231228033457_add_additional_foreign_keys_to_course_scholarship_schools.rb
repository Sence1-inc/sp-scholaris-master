class AddAdditionalForeignKeysToCourseScholarshipSchools < ActiveRecord::Migration[7.1]
  def change
    change_column :course_scholarship_schools, :course_id, :bigint

    add_foreign_key :course_scholarship_schools, :courses, column: :course_id, name: 'fk_course_scholarship_schools_courses'
  end
end
