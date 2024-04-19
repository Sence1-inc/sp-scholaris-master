class AddDeletedAtToNewslettersTable < ActiveRecord::Migration[7.1]
  def change
    add_column :newsletters, :deleted_at, :datetime
    add_index :newsletters, :deleted_at
  end
end
