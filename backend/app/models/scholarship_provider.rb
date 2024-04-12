class ScholarshipProvider < ApplicationRecord
  has_many :scholarships
  has_one :scholarship_provider_profile
  belongs_to :user

  validates :provider_name, presence: true

  def as_json(options = {})
    super(options.merge(except: [:created_at, :updated_at, :deleted_at]))
  end
end
