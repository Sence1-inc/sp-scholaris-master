class CreateScholarshipProviders < ActiveRecord::Migration[7.1]
  def change
    create_table :scholarship_providers do |t|
      t.string :provider_name
      t.integer :user_id, null: false
      
      t.timestamp :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :updated_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :deleted_at
    end

    add_index :scholarship_providers, :user_id
  end
end
