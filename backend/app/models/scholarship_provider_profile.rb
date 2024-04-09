class ScholarshipProviderProfile < ApplicationRecord
  belongs_to :scholarship_provider
  belongs_to :region
  belongs_to :province
  belongs_to :city

  def as_json(options = {})
    super(
      only: [
        :id,
        :provider_type,
        :description
      ],
      include: {
        scholarship_provider: {
          only: [
            :id,
            :provider_name,
            :user_id
          ]
        },
        region: {
          only: [
            :id,
            :region_name
          ]
        },
        city: {
          only: [
            :id,
            :city_name
          ]
        },
        province: {
          only: [
            :id,
            :province_name
          ]
        }
      }
    )
  end
  

end
