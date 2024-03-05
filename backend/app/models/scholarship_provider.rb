class ScholarshipProvider < ApplicationRecord
  has_many :scholarships
  has_one :scholarship_provider_profile

  validates :provider_name, presence: true
end
