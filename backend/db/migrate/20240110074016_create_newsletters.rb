class CreateNewsletters < ActiveRecord::Migration[7.1]
  def change
    create_table :newsletters do |t|
      t.string :subject, null: false
      t.text :content, null: false
      t.text :user_type, null: false

      t.timestamp :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamp :updated_at, default: -> { 'CURRENT_TIMESTAMP' }
    end
  end
end
