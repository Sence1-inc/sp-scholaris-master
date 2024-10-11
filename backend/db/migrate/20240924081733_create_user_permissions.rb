class CreateUserPermissions < ActiveRecord::Migration[7.1]
  def change
    create_table :user_permissions do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :user_type, limit: 2, null: false
      t.boolean :can_add, default: true
      t.boolean :can_view, default: true
      t.boolean :can_edit, default: true
      t.boolean :can_delete, default: true
      t.boolean :is_enabled, default: true

      t.timestamps
      t.timestamp :deleted_at
    end
  end
end
