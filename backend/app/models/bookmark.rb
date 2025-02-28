class Bookmark < ApplicationRecord

    belongs_to :user
    belongs_to :scholarship
  
    default_scope -> { where(deleted_at: nil) }
    

    def self.is_bookmarked(user_id, scholarship_id)
        if self.find_by(user_id: user_id, scholarship_id: scholarship_id)
            return true
        else
            return false
        end
    end

    def self.get_bookmark_id(scholarship, user_id)
        return scholarship.bookmarks.where('user_id = '+ user_id.to_s).pick(:id)
    end

end
