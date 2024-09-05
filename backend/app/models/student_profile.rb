class StudentProfile < ApplicationRecord
  belongs_to :user

  default_scope -> { where(deleted_at: nil) }

  def as_json(options = {})
    super(options.merge(except: [:created_at, :updated_at, :deleted_at]))
  end
end
