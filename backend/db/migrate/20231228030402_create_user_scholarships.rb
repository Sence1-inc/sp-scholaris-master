class CreateUserScholarships < ActiveRecord::Migration[7.1]
  def change
    create_table :user_scholarships do |t|
      t.integer :scholarship_id
      t.integer :user_id, null: false
      t.integer :application_status, null: false
      
      t.timestamp :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :updated_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :deleted_at
    end

    add_index :user_scholarships, :scholarship_id
    add_index :user_scholarships, :user_id
  end
end
