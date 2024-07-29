class CreateScholarshipBenefitCategories < ActiveRecord::Migration[7.1]
  def change
    create_table :scholarship_benefit_categories do |t|
      t.bigint :scholarship_id, null: false
      t.bigint :benefit_category_id, null: false
      t.timestamp :deleted_at

      t.timestamps
    end
  end
end
