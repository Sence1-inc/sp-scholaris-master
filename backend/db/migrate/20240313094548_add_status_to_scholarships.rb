class AddStatusToScholarships < ActiveRecord::Migration[7.1]
  def change
    add_column :scholarships, :status, :string
  end
end
