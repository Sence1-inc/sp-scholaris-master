class RemoveUniqueIndexFromUsersEmail < ActiveRecord::Migration[7.1]
  def change
    remove_index :subscribers, name: 'index_subscribers_on_email'
  end
end
