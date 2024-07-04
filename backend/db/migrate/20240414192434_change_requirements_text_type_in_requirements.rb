class ChangeRequirementsTextTypeInRequirements < ActiveRecord::Migration[7.1]
  def change
    change_column :requirements, :requirements_text, :text
  end
end
