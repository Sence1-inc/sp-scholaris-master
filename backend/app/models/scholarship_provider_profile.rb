class ScholarshipProviderProfile < ApplicationRecord
  belongs_to :scholarship_provider
  belongs_to :region
  belongs_to :province
  belongs_to :city

  def as_json(options = {})
    super(options.merge(include: [:scholarship_provider, :region, :province, :city], except: [:created_at, :updated_at, :deleted_at, :city_id, :province_id, :region_id, :scholarship_provider_id]))
  end
  

end
