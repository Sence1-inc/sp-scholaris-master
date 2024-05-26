class Subscriber < ApplicationRecord    
  validates :email, presence: true
  validates :user_type, presence: true, inclusion: { in: %w(provider student) }
  validate :unique_email_for_roles, if: :email_or_user_type_will_change?

  private

  def unique_email_for_roles
    if Subscriber.where(email: email, user_type: user_type).exists?
      errors.add(:email, "has already been taken for this role")
    end
  end

  def email_or_user_type_will_change?
    will_save_change_to_email? || will_save_change_to_user_type?
  end

end
