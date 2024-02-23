class CreateScholarshipEligibilities < ActiveRecord::Migration[7.1]
  def change
    create_table :scholarship_eligibilities do |t|
      t.bigint :scholarship_id
      t.bigint :eligibility_id
      
      t.timestamp :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :updated_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :deleted_at
    end

    add_index :scholarship_eligibilities, :scholarship_id
    add_index :scholarship_eligibilities, :eligibility_id
  end
end
