class UserPermission < ApplicationRecord
  belongs_to :user

  PARENT = 0
  CHILD = 1

  USER_TYPES = {
    parent: PARENT,
    child: CHILD,
  }.freeze

  validates :user_type, inclusion: { in: USER_TYPES.values }
end
