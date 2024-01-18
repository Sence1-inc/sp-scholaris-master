class RemoveUniqueConstraintFromSubscriberEmail < ActiveRecord::Migration[7.1]
  def change
    def change
      remove_index :newsletter_logs, :email
      add_index :newsletter_logs, :email, unique: false
    end
  end
end
