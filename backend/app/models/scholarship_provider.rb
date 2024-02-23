class ScholarshipProvider < ApplicationRecord
  has_many :scholarships
  has_one :scholarship_provider_profile
end
