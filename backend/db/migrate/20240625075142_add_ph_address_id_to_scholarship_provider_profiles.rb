class AddPhAddressIdToScholarshipProviderProfiles < ActiveRecord::Migration[7.1]
  def change
    add_column :scholarship_provider_profiles, :ph_address_id, :bigint
    add_foreign_key :scholarship_provider_profiles, :ph_addresses, column: :ph_address_id
    add_index :scholarship_provider_profiles, :ph_address_id
  end
end
