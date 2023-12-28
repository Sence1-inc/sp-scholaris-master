class AddForeignKeyToScholarshipProviderProfile < ActiveRecord::Migration[7.1]
  def change
    change_column :scholarship_provider_profiles, :scholarship_provider_id, :bigint

    add_foreign_key :scholarship_provider_profiles, :scholarship_providers, column: :scholarship_provider_id, name: 'fk_scholarship_provider_profiles_scholarship_providers'
  end
end
