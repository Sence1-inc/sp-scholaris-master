class ScholarshipType < ApplicationRecord
  has_many :scholarships

  validates :scholarship_type_name, presence: true
end
