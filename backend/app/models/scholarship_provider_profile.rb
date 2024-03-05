class ScholarshipProviderProfile < ApplicationRecord
  belongs_to :scholarship_provider
  belongs_to :region
  belongs_to :province
  belongs_to :city

  validates :description, presence: true
  validates :provider_type, presence: true
  validates :region, presence: true
  validates :province, presence: true
  validates :city, presence: true
  validates :scholarship_provider, presence: true
end
