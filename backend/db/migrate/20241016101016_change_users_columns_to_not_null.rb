class ChangeUsersColumnsToNotNull < ActiveRecord::Migration[7.1]
  def change
    change_column_null :users, :first_name, false
    change_column_null :users, :last_name, false
    change_column_null :users, :birthdate, false
  end
end
