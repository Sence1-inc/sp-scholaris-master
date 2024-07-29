class AddForeignKeysToScholarshipBenefitCategories < ActiveRecord::Migration[7.1]
  def change
      add_foreign_key :scholarship_benefit_categories, :scholarships, name: 'fk_scholarship_benefit_categories_scholarships'
      add_foreign_key :scholarship_benefit_categories, :benefit_categories, name: 'fk_scholarship_benefit_categories_benefit_categories'
  end
end
