class MakeFieldsNullableInUsers < ActiveRecord::Migration[7.1]
  def change
    change_column_null :users, :first_name, true
    change_column_null :users, :last_name, true
    change_column_null :users, :birthdate, true
  end
end
