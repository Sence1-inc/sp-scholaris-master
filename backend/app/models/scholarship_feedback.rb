class ScholarshipFeedback < ApplicationRecord
  belongs_to :scholarship_provider
  belongs_to :scholarship

  validates :notes, length: { maximum: 1000 }, allow_blank: true

  def as_json(options = {})
    super(options.merge(include: [:scholarship_provider, :scholarship], except: [:deleted_at]))
  end
end
