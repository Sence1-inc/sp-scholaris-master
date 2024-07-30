class ScholarshipApplication < ApplicationRecord
  has_many :scholarships

  default_scope -> { where(deleted_at: nil) }
end
