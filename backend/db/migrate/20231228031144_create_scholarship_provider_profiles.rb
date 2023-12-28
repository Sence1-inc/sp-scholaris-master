class CreateScholarshipProviderProfiles < ActiveRecord::Migration[7.1]
  def change
    create_table :scholarship_provider_profiles do |t|
      t.integer :scholarship_provider_id, null: false
      t.string :provider_type
      t.text :description
      t.integer :region_id
      t.integer :province_id
      t.integer :city_id
      
      t.timestamp :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :updated_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :deleted_at
    end

    add_index :scholarship_provider_profiles, :scholarship_provider_id
    add_index :scholarship_provider_profiles, :region_id
    add_index :scholarship_provider_profiles, :province_id
    add_index :scholarship_provider_profiles, :city_id
  end
end
