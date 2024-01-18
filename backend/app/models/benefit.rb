class Benefit < ApplicationRecord
  has_and_belongs_to_many :scholarships, join_table: "scholarship_benefits"
end
