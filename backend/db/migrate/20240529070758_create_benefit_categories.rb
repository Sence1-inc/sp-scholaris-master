class CreateBenefitCategories < ActiveRecord::Migration[7.1]
  def change
    create_table :benefit_categories do |t|
      t.string :category_name
      t.timestamp :deleted_at

      t.timestamps
    end
  end
end
