class Subscriber < ApplicationRecord    
  validates :email, presence: true, uniqueness: true
  validates :user_type, presence: true, inclusion: { in: %w(provider student) }

end
