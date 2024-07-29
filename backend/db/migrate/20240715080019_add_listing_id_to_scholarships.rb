class AddListingIdToScholarships < ActiveRecord::Migration[7.1]
  def change
    add_column :scholarships, :listing_id, :integer, null: false
    add_index :scholarships, :listing_id
  end
end
