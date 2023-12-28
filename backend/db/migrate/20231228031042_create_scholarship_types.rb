class CreateScholarshipTypes < ActiveRecord::Migration[7.1]
  def change
    create_table :scholarship_types do |t|
      t.string :scholarship_type_name
      
      t.timestamp :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :updated_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :deleted_at
    end
  end
end
