class CreateStudentProfiles < ActiveRecord::Migration[7.1]
  def change
    create_table :student_profiles do |t|
      t.integer :user_id, null: false
      t.string :avatar
     
      t.timestamp :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :updated_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :deleted_at
    end

    add_index :student_profiles, :user_id
  end
end
