class Benefit < ApplicationRecord
  has_and_belongs_to_many :scholarships, join_table: "scholarship_benefits"

  default_scope -> { where(deleted_at: nil) }

  validates :benefit_name, presence: true
end
