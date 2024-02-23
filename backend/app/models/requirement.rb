class Requirement < ApplicationRecord
    has_and_belongs_to_many :scholarships, join_table: "scholarship_requirements"
end
