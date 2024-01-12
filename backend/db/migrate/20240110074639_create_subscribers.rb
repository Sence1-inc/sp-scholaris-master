class CreateSubscribers < ActiveRecord::Migration[7.1]
  def change
    create_table :subscribers do |t|
      t.string :email, null: false
      t.string :user_type, null: false
      t.timestamp :subscribed_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :unsubscribed_at

      t.timestamp :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :updated_at, default: -> { 'CURRENT_TIMESTAMP' }
    end

    add_index :subscribers, :email, unique: true
  end
end
