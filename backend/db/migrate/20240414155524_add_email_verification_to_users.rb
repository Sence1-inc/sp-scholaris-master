class AddEmailVerificationToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :verification_token, :string
    add_column :users, :is_verified, :boolean
  end
end
