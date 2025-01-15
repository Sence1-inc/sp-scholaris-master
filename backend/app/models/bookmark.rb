class Bookmark < ApplicationRecord

    belongs_to :user
    belongs_to :scholarship
  
    default_scope -> { where(deleted_at: nil) }

end
