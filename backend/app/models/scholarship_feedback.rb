class ScholarshipFeedback < ApplicationRecord
  belongs_to :scholarship_provider
  belongs_to :scholarship
end
