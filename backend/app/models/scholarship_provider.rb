class ScholarshipProvider < ApplicationRecord
  has_many :scholarships
  has_many :scholarship_applications, through: :scholarships
  has_one :scholarship_provider_profile
  belongs_to :user

  default_scope -> { where(deleted_at: nil) }

  def as_json(options = {})
    super(options.merge(include: [:scholarship_provider_profile, :scholarship_applications], except: [:created_at, :updated_at, :deleted_at]))
  end
end
