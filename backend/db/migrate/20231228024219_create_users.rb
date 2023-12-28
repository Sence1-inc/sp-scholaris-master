class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :email_address, null: false
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :birthdate, null: false
      t.boolean :is_active, null: false, default: true
      t.integer :role_id, null: false
      t.string :session_token

      t.timestamp :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :updated_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :deleted_at
    end

    add_index :users, :role_id
    add_index :users, :email_address, unique: true
  end
end
