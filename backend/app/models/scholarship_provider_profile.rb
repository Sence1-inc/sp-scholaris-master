class ScholarshipProviderProfile < ApplicationRecord
  belongs_to :scholarship_provider
  belongs_to :ph_address, foreign_key: 'ph_address_id'

  default_scope -> { where(deleted_at: nil) }

  def as_json(options = {})
    super(options.merge(include: [:scholarship_provider, :ph_address], except: [:created_at, :updated_at, :deleted_at, :city_id, :province_id, :region_id, :scholarship_provider_id]))
  end
end
