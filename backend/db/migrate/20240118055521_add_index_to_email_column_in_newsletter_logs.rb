class AddIndexToEmailColumnInNewsletterLogs < ActiveRecord::Migration[7.1]
  def change
    add_index :newsletter_logs, :email, unique: false
  end
end
