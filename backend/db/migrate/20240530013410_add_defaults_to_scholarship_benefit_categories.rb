class AddDefaultsToScholarshipBenefitCategories < ActiveRecord::Migration[7.1]
  def change
    change_column :scholarship_benefit_categories, :created_at, :timestamp, default: -> { 'CURRENT_TIMESTAMP' }
    change_column :scholarship_benefit_categories, :updated_at, :timestamp, default: -> { 'CURRENT_TIMESTAMP' }
  end
end
