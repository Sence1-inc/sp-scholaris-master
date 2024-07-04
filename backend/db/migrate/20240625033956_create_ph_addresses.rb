class CreatePhAddresses < ActiveRecord::Migration[7.1]
  def change
    create_table :ph_addresses do |t|
      t.string :barangay
      t.string :city
      t.string :province
      t.string :region
      t.timestamp :deleted_at

      t.timestamps
    end
  end
end
