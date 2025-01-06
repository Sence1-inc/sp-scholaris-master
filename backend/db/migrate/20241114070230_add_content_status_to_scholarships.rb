class AddContentStatusToScholarships < ActiveRecord::Migration[7.1]
  def change
    add_column :scholarships, :content_status, :string
  end
end
