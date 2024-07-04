class SurveyResponse < ApplicationRecord
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :classification, presence: true

  default_scope -> { where(deleted_at: nil) }
end
