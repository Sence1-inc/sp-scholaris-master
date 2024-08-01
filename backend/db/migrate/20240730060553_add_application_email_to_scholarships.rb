class AddApplicationEmailToScholarships < ActiveRecord::Migration[7.1]
  def change
    add_column :scholarships, :application_email, :string, null: false
    add_index :scholarships, :application_email
  end
end
