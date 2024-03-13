class Scholarship < ApplicationRecord
  belongs_to :scholarship_provider
  belongs_to :scholarship_type
  has_and_belongs_to_many :courses, join_table: "course_scholarship_schools"
  has_and_belongs_to_many :schools, join_table: "course_scholarship_schools"
  has_and_belongs_to_many :benefits, join_table: "scholarship_benefits"
  has_and_belongs_to_many :requirements, join_table: "scholarship_requirements"
  has_and_belongs_to_many :eligibilities, join_table: "scholarship_eligibilities"

  validates :scholarship_name, presence: true
  validates :description, presence: true
  validates :start_date, presence: true
  validates :due_date, presence: true
  validates :application_link, presence: true
  validates :school_year, presence: true
  validates :scholarship_provider, presence: true
  validates :scholarship_type, presence: true
  validate :valid_dates

  scope :filtered, ->(params) {
    results = all
    results = results.includes(:courses, :schools, :scholarship_provider, :benefits)
    results = results.joins(:courses).where("courses.course_name = ?", params[:course]) if params[:course].present?
    results = results.joins(:schools).where("schools.school_name = ?", params[:school]) if params[:school].present?
    results = results.joins(:benefits).where("benefits.benefit_name = ?", params[:benefit]) if params[:benefit].present?
    results = results.joins(schools: :city).joins(schools: :province).joins(schools: :region)
                  .where("cities.city_name = ? OR provinces.province_name = ? OR regions.region_name = ?",
                         params[:location], params[:location], params[:location]) if params[:location].present?
    results = results.where("start_date >= ?", DateTime.parse(params[:start_date])) if params[:start_date].present?
    results = results.where("due_date <= ?", DateTime.parse(params[:due_date])) if params[:due_date].present?
    results = results.where("scholarship_name LIKE ?", "%#{params[:name]}%") if params[:name].present?
    results = results.joins(:scholarship_provider).where("provider_name = ?", params[:provider]) if params[:provider].present?

    results
  }

  private

  def valid_dates
    if due_date.present? && start_date.present? && due_date <= start_date
      errors.add(:due_date, "must be after the start date")
    end
  end
end
