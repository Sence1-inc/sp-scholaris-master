class Subscriber < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  validates :user_type, presence: true, inclusion: { in: %w(provider student) }

    def self.soft_delete(obj)
        obj.update(deleted_at:Time.now) if obj.deleted_at == nil
    end

    def self.restore(obj)
        obj.update(deleted_at:nil) if obj.deleted_at.present?
    end
end
