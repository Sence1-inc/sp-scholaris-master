class ChangeEligibilityTextTypeInEligibilities < ActiveRecord::Migration[7.1]
  def change
    change_column :eligibilities, :eligibility_text, :text
  end
end
