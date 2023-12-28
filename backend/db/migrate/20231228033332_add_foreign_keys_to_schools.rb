class AddForeignKeysToSchools < ActiveRecord::Migration[7.1]
  def change
    change_column :schools, :province_id, :bigint
    change_column :schools, :region_id, :bigint
    change_column :schools, :city_id, :bigint

    add_foreign_key :schools, :provinces, column: :province_id, name: 'fk_schools_provinces'
    add_foreign_key :schools, :regions, column: :region_id, name: 'fk_schools_regions'
    add_foreign_key :schools, :cities, column: :city_id, name: 'fk_schools_cities'
  end
end
