class StudentProfile < ApplicationRecord
  belongs_to :user

  default_scope -> { where(deleted_at: nil) }

  before_validation do
    self.age = ((Time.zone.now - self.user.birthdate.to_time) / 1.year.seconds).floor
  end

  def as_json(options = {})
    super(options.merge(except: [:created_at, :updated_at, :deleted_at]))
  end
end
