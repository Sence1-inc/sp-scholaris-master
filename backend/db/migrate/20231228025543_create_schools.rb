class CreateSchools < ActiveRecord::Migration[7.1]
  def change
    create_table :schools do |t|
      t.string :school_name
      t.integer :region_id
      t.integer :province_id
      t.integer :city_id
      
      t.timestamp :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :updated_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :deleted_at
    end

    add_index :schools, :region_id
    add_index :schools, :province_id
    add_index :schools, :city_id
  end
end
