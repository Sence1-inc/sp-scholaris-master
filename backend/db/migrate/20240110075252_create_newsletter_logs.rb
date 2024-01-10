class CreateNewsletterLogs < ActiveRecord::Migration[7.1]
  def change
    create_table :newsletter_logs do |t|
      t.string :email, null: false
      t.references :newsletter, foreign_key: true
      t.timestamp :sent_at, default: -> { 'CURRENT_TIMESTAMP' }

      t.timestamp :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :updated_at, default: -> { 'CURRENT_TIMESTAMP' }
    end

    add_index :newsletter_logs, :email, unique: true
  end
end
