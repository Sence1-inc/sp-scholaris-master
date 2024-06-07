class ScholarshipProvider < ApplicationRecord
  has_many :scholarships
  has_one :scholarship_provider_profile
  belongs_to :user

  def as_json(options = {})
    super(options.merge(include: [:user, :scholarship_provider_profile],except: [:created_at, :updated_at, :deleted_at]))
  end
end
