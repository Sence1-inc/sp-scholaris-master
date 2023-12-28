class AddForeignKeysToUserScholarships < ActiveRecord::Migration[7.1]
  def change
    change_column :user_scholarships, :scholarship_id, :bigint
    change_column :user_scholarships, :user_id, :bigint

    add_foreign_key :user_scholarships, :scholarships, column: :scholarship_id, name: 'fk_user_scholarships_scholarships'
    add_foreign_key :user_scholarships, :users, column: :user_id, name: 'fk_user_scholarships_users'
  end
end
