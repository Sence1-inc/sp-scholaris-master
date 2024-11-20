class AddIsApplicationLinkActiveToScholarships < ActiveRecord::Migration[7.1]
  def change
    add_column :scholarships, :is_application_link_active, :boolean
  end
end
