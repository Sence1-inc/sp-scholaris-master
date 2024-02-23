class ScholarshipProviderProfile < ApplicationRecord
  belongs_to :scholarship_provider
  belongs_to :region
  belongs_to :province
  belongs_to :city
end
