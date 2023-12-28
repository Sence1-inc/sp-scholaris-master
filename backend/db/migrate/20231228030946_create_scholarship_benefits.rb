class CreateScholarshipBenefits < ActiveRecord::Migration[7.1]
  def change
    create_table :scholarship_benefits do |t|
      t.integer :scholarship_id
      t.integer :benefit_id
      
      t.timestamp :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :updated_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :deleted_at
    end

    add_index :scholarship_benefits, :scholarship_id
    add_index :scholarship_benefits, :benefit_id
  end
end
