class Eligibility < ApplicationRecord
    has_and_belongs_to_many :scholarships, join_table: "scholarship_eligibilities"

    validates :eligibility_text, presence: true
end
