class AddForeignKeysToScholarships < ActiveRecord::Migration[7.1]
  def change
    change_column :scholarships, :requirement_id, :bigint
    change_column :scholarships, :eligibility_id, :bigint
    change_column :scholarships, :scholarship_type_id, :bigint

    add_foreign_key :scholarships, :requirements, name: 'fk_scholarships_requirements'
    add_foreign_key :scholarships, :eligibilities, name: 'fk_scholarships_eligibilities'
    add_foreign_key :scholarships, :scholarship_types, name: 'fk_scholarships_scholarship_types'
  end
end
