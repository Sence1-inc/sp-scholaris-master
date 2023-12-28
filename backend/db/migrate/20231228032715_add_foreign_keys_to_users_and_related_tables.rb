class AddForeignKeysToUsersAndRelatedTables < ActiveRecord::Migration[7.1]
  def change
    change_column :users, :role_id, :bigint
    change_column :sessions, :user_id, :bigint
    change_column :scholarship_providers, :user_id, :bigint
    change_column :student_profiles, :user_id, :bigint

    add_foreign_key :users, :roles, column: :role_id, name: 'fk_users_roles'
    add_foreign_key :sessions, :users, column: :user_id, name: 'fk_sessions_users'
    add_foreign_key :scholarship_providers, :users, column: :user_id, name: 'fk_scholarship_providers_users'
    add_foreign_key :student_profiles, :users, column: :user_id, name: 'fk_student_profiles_users'
  end
end
