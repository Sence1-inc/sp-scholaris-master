class ChangeUnsubscribeAtToDeletedAt < ActiveRecord::Migration[7.1]
  def change
    rename_column :subscribers, :unsubscribed_at, :deleted_at
  end
end
