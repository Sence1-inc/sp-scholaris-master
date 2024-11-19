class AddScholarshipToScholarshipFeedbacks < ActiveRecord::Migration[7.1]
  def change
    add_reference :scholarship_feedbacks, :scholarship, null: false, foreign_key: true
  end
end
