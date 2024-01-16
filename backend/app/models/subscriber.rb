class Subscriber < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  validates :user_type, presence: true, inclusion: { in: %w(provider student) }

    # scope :soft_delete, -> { where("LENGTH(title) > ?", length) }

    def self.soft_delete(obj)
    # abort(obj.unsubscribed_at)
    obj.update(unsubscribed_at:Time.now) if obj.unsubscribed_at == nil
    end

    def self.restore(obj)
        obj.update(unsubscribed_at:nil) if obj.unsubscribed_at.present?
    end
end
