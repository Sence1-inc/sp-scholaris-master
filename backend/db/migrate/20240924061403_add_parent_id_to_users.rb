class AddParentIdToUsers < ActiveRecord::Migration[7.1]
  def change
    add_reference :users, :parent, foreign_key: { to_table: :users }, null: true
  end
end
