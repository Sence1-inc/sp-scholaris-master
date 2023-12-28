class CreateBenefits < ActiveRecord::Migration[7.1]
  def change
    create_table :benefits do |t|
      t.string :benefit_name
      
      t.timestamp :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :updated_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :deleted_at
    end
  end
end
