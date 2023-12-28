class CreateEligibilities < ActiveRecord::Migration[7.1]
  def change
    create_table :eligibilities do |t|
      t.text :eligibility_text
      
      t.timestamp :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :updated_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :deleted_at
    end
  end
end
