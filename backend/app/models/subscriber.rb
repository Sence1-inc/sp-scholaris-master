class Subscriber < ApplicationRecord    
  validates :email, presence: true, uniqueness: true
  validates :user_type, presence: true, inclusion: { in: %w(provider student) }

  default_scope -> { where(deleted_at: nil) }

end
