class Region < ApplicationRecord
  has_many :schools

  def as_json(options = {})
    super(except: [:created_at, :updated_at, :deleted_at])
  end
end
