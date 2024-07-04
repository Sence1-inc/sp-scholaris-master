class Role < ApplicationRecord
  has_many :users

  default_scope -> { where(deleted_at: nil) }
end
