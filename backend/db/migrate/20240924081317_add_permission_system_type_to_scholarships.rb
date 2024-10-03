class AddPermissionSystemTypeToScholarships < ActiveRecord::Migration[7.1]
  def change
    add_column :scholarships, :permission_system_type, :integer, limit: 2
  end
end
