class SurveyQuestion < ApplicationRecord

    scope :student_questions, -> (user_type = 'student'){ where("user_type = ?", user_type) }

end
