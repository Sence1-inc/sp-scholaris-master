class ChangeDescriptionTypeInScholarships < ActiveRecord::Migration[7.1]
  def change
    change_column :scholarships, :description, :text
  end
end
