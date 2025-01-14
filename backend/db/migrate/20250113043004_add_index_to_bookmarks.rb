class AddIndexToBookmarks < ActiveRecord::Migration[7.1]
  def change

    add_index :bookmarks, :user_id

  end
end
