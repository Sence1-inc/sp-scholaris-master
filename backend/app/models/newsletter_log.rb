class NewsletterLog < ApplicationRecord
  belongs_to :newsletter

  default_scope -> { where(deleted_at: nil) }
end
