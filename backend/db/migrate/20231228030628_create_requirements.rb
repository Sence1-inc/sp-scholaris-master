class CreateRequirements < ActiveRecord::Migration[7.1]
  def change
    create_table :requirements do |t|
      t.text :requirements_text
      
      t.timestamp :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :updated_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :deleted_at
    end
  end
end
