class SurveyQuestion < ApplicationRecord

    scope :student_questions, -> (user_type = 'student'){ where("user_type = ?", user_type) }

    default_scope -> { where(deleted_at: nil) }

end
