class BenefitCategory < ApplicationRecord
  has_and_belongs_to_many :scholarships, join_table: 'scholarship_benefit_categories'

  default_scope -> { where(deleted_at: nil) }
end
