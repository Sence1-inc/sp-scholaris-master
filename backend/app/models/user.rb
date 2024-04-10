class User < ApplicationRecord
  belongs_to :role
  has_one :scholarship_provider

  default_scope -> { where(deleted_at: nil) }

  def as_json(options = {})
    super(options.merge(include: [:role, :scholarship_provider], except: [:created_at, :updated_at, :deleted_at, :password]))
  end
end
