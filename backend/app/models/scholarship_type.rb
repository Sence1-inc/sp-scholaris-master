class ScholarshipType < ApplicationRecord
  has_many :scholarships

  default_scope -> { where(deleted_at: nil) }

  validates :scholarship_type_name, presence: true
end
