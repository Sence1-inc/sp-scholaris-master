class AddDeletedAtToNewsletterLogsTable < ActiveRecord::Migration[7.1]
  def change
    add_column :newsletter_logs, :deleted_at, :datetime
    add_index :newsletter_logs, :deleted_at
  end
end
