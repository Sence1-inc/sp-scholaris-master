class RemoveCityProvinceRegionFromScholarshipProviderProfiles < ActiveRecord::Migration[7.1]
  def change
    remove_column :scholarship_provider_profiles, :city_id, :bigint
    remove_column :scholarship_provider_profiles, :province_id, :bigint
    remove_column :scholarship_provider_profiles, :region_id, :bigint
  end
end
