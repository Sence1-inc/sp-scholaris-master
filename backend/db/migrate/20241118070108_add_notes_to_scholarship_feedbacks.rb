class AddNotesToScholarshipFeedbacks < ActiveRecord::Migration[7.1]
  def change
    add_column :scholarship_feedbacks, :notes, :text
  end
end
