class AddAdditionalForeignKeyToScholarshipBenefits < ActiveRecord::Migration[7.1]
  def change
    change_column :scholarship_benefits, :benefit_id, :bigint

    add_foreign_key :scholarship_benefits, :benefits, column: :benefit_id, name: 'fk_scholarships_benefits'
  end
end
