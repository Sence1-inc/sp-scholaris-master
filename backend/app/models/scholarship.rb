class Scholarship < ApplicationRecord
  before_destroy :soft_delete_associations

  belongs_to :scholarship_provider
  belongs_to :scholarship_type
  has_and_belongs_to_many :courses, join_table: "course_scholarship_schools"
  has_and_belongs_to_many :schools, join_table: "course_scholarship_schools"
  has_and_belongs_to_many :benefits, join_table: "scholarship_benefits"
  has_and_belongs_to_many :requirements, join_table: "scholarship_requirements"
  has_and_belongs_to_many :eligibilities, join_table: "scholarship_eligibilities"
  has_and_belongs_to_many :benefit_categories, join_table: "scholarship_benefit_categories"

  validates :scholarship_name, presence: true
  validates :description, presence: true
  validates :start_date, presence: true
  validates :due_date, presence: true
  validates :application_link, presence: true
  validates :school_year, presence: true
  validates :scholarship_provider, presence: true
  validates :scholarship_type, presence: true
  validates :status, presence: true
  validate :valid_dates

  default_scope -> { where(deleted_at: nil) }

  scope :filtered, ->(params) {
    results = all.where(deleted_at: nil, status: 'active')
    results = results.includes(:courses, :schools, :scholarship_provider, :benefits, :benefit_categories)
    results = results.joins(:courses).where("courses.course_name = ?", params[:course]) if params[:course].present?
    results = results.joins(:schools).where("schools.school_name = ?", params[:school]) if params[:school].present?
    results = results.joins(:benefit_categories).where("LOWER(TRIM(benefit_categories.category_name)) = ?", params[:benefits].strip.downcase) if params[:benefits].present?
    results = results.joins(schools: :city).joins(schools: :province).joins(schools: :region)
                  .where("cities.city_name = ? OR provinces.province_name = ? OR regions.region_name = ?",
                         params[:location], params[:location], params[:location]) if params[:location].present?
    results = results.where("DATE(CONVERT_TZ(start_date, '+00:00', ?)) >= ?", params[:timezone], Date.parse(params[:start_date])) if params[:start_date].present? 
    results = results.where("DATE(CONVERT_TZ(due_date, '+00:00', ?)) <= ?", params[:timezone], Date.parse(params[:due_date])) if params[:due_date].present? 
    results = results.where("scholarship_name LIKE ?", "%#{params[:name]}%") if params[:name].present?
    results = results.joins(:scholarship_provider).where("provider_name = ?", params[:provider]) if params[:provider].present?

    results
  }

  def as_json(options = {})
    super(options.merge(
      include: {
        benefits: {},
        eligibilities: {},
        requirements: {},
        scholarship_provider: {
          include: {
            scholarship_provider_profile: { only: [:id, :description] }
          },
        },
        scholarship_type: {},
        courses: {},
        schools: {},
        benefit_categories: {}
      },
      except: [:created_at, :updated_at, :deleted_at, :eligibility_id, :requirement_id, :scholarship_provider_id, :scholarship_type_id]
    ))
  end

  def add_association_record(association_name, record)
    association = self.send(association_name)
    association << record unless association.exists?(record.id)
  end

  private

  def valid_dates
    if due_date.present? && start_date.present? && due_date <= start_date
      errors.add(:due_date, "must be after the start date")
    end
  end

  def soft_delete_associations
    self.requirements.update_all(deleted_at: Time.current) if self.requirements.deleted_at == nil
    self.benefits.update_all(deleted_at: Time.current) if self.benefits.deleted_at == nil
    self.eligibilities.update_all(deleted_at: Time.current) if self.eligibilities.deleted_at == nil
  end

  def destroying?
    _destroy
  end
end
