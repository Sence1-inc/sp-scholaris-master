class RemoveUniqueConstraintFromSubscriberEmail < ActiveRecord::Migration[7.1]
  def change
    remove_index :newsletter_logs, :email
  end
end
