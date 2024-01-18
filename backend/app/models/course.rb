class Course < ApplicationRecord
  has_and_belongs_to_many :scholarships, join_table: "course_scholarship_schools"
  has_and_belongs_to_many :schools, join_table: "course_scholarship_schools"
end
