class CreateScholarships < ActiveRecord::Migration[7.1]
  def change
    create_table :scholarships do |t|
      t.string :scholarship_name, null: false
      t.datetime :start_date
      t.datetime :due_date, null: false
      t.string :application_link
      t.string :school_year, null: false
      t.integer :scholarship_provider_id
      t.integer :requirement_id
      t.integer :eligibility_id
      t.integer :scholarship_type_id
      t.timestamp :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :updated_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :deleted_at
    end

    add_index :scholarships, :scholarship_provider_id
    add_index :scholarships, :requirement_id
    add_index :scholarships, :eligibility_id
    add_index :scholarships, :scholarship_type_id
  end
end
