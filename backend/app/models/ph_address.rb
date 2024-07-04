class PhAddress < ApplicationRecord
  has_many :scholarship_provider_profiles, foreign_key: 'ph_address_id'

  default_scope -> { where(deleted_at: nil) }

  def as_json(options = {})
    super(except: [:created_at, :updated_at, :deleted_at])
  end
end
