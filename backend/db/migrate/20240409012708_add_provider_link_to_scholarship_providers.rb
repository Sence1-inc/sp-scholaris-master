class AddProviderLinkToScholarshipProviders < ActiveRecord::Migration[7.1]
  def change
    add_column :scholarship_providers, :provider_link, :string
  end
end
