class School < ApplicationRecord
  has_and_belongs_to_many :scholarships, join_table: "course_scholarship_schools"
  has_and_belongs_to_many :courses, join_table: "course_scholarship_schools"
  belongs_to :city
  belongs_to :province
  belongs_to :region

  default_scope -> { where(deleted_at: nil) }
end
