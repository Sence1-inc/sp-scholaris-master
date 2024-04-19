class City < ApplicationRecord
  has_many :schools

  default_scope -> { where(deleted_at: nil) }

  def as_json(options = {})
    super(except: [:created_at, :updated_at, :deleted_at])
  end
end
