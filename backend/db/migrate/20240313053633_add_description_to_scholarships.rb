class AddDescriptionToScholarships < ActiveRecord::Migration[7.1]
  def change
    add_column :scholarships, :description, :string
  end
end
