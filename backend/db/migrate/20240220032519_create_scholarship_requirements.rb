class CreateScholarshipRequirements < ActiveRecord::Migration[7.1]
  def change
    create_table :scholarship_requirements do |t|
      t.bigint :scholarship_id
      t.bigint :requirement_id
      
      t.timestamp :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :updated_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :deleted_at
    end

    add_index :scholarship_requirements, :scholarship_id
    add_index :scholarship_requirements, :requirement_id
  end
end
