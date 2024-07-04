class ChangeBenefitNameTypeInBenefits < ActiveRecord::Migration[7.1]
  def change
    change_column :benefits, :benefit_name, :text
  end
end
