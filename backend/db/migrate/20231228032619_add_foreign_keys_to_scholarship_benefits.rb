class AddForeignKeysToScholarshipBenefits < ActiveRecord::Migration[7.1]
  def change
    change_column :scholarship_benefits, :scholarship_id, :bigint
    change_column :scholarship_benefits, :benefit_id, :bigint

    add_foreign_key :scholarship_benefits, :scholarships, column: :scholarship_id, name: 'fk_scholarship_benefits_scholarships'
    add_foreign_key :scholarship_benefits, :benefits, column: :benefit_id, name: 'fk_scholarship_benefits_benefits'
  end
end
