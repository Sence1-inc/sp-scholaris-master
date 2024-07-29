class Requirement < ApplicationRecord
    has_and_belongs_to_many :scholarships, join_table: "scholarship_requirements"

    default_scope -> { where(deleted_at: nil) }

    validates :requirements_text, presence: true
end
