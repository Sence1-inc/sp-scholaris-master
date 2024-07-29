class AddEmailVerificationExpirationToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :verification_expires_at, :datetime
  end
end
