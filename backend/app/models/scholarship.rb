class Scholarship < ApplicationRecord
  has_and_belongs_to_many :courses, join_table: "course_scholarship_schools"
  has_and_belongs_to_many :schools, join_table: "course_scholarship_schools"
  has_and_belongs_to_many :benefits, join_table: "scholarship_benefits"

  validate :valid_dates

  scope :filtered, ->(params) {
    results = all
    results = results.includes(:courses, :schools)
    results = results.joins(:courses).where("courses.course_name = ?", params[:course]) if params[:course].present?
    results = results.joins(:schools).where("schools.school_name = ?", params[:school]) if params[:school].present?
    results = results.joins(:benefits).where("benefits.benefit_name = ?", params[:benefit]) if params[:benefit].present?
    results = results.joins(schools: :city).joins(schools: :province).joins(schools: :region)
                  .where("cities.city_name = ? OR provinces.province_name = ? OR regions.region_name = ?",
                         params[:location], params[:location], params[:location]) if params[:location].present?
    results = results.where("start_date >= ?", params[:start_date]) if params[:start_date].present?
    results = results.where("due_date <= ?", params[:due_date]) if params[:due_date].present?

    results
  }

  private

  def valid_dates
    errors.add(:due_date, "must be after the start date") if due_date.present? && start_date.present? && due_date <= start_date
  end
end
