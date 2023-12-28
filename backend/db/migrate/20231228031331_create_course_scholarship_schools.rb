class CreateCourseScholarshipSchools < ActiveRecord::Migration[7.1]
  def change
    create_table :course_scholarship_schools do |t|
      t.integer :scholarship_id, null: false
      t.integer :course_id, null: false
      t.integer :school_id, null: false
      
      t.timestamp :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :updated_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :deleted_at
    end

    add_index :course_scholarship_schools, :scholarship_id
    add_index :course_scholarship_schools, :course_id
    add_index :course_scholarship_schools, :school_id
  end
end
