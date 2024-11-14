class User < ApplicationRecord
  # has_secure_password

  belongs_to :role
  has_one :scholarship_provider
  has_one :student_profile
  has_many :children, class_name: 'User', foreign_key: 'parent_id'
  belongs_to :parent, class_name: 'User', optional: true
  has_many :user_permissions, dependent: :destroy
  has_many :scholarship_applications
  has_many :scholarship_providers, through: :children
  has_many :scholarships, through: :scholarship_provider

  validates :email_address, presence: true
  validate :birthdate_is_valid

  default_scope -> { where(deleted_at: nil) }

  def as_json(options = {})
    super(options.merge(include: [:role, :student_profile, :scholarship_provider], except: [:created_at, :updated_at, :deleted_at]))
  end

  def birthdate_is_valid
    if birthdate.present?
      parsed_birthdate = Date.parse(birthdate) rescue nil
      if parsed_birthdate.nil?
        errors.add(:birthdate, "is not a valid date.")
      elsif parsed_birthdate > Date.today
        errors.add(:birthdate, "must be before today.")
      elsif parsed_birthdate < Date.new(1920, 1, 1)
        errors.add(:birthdate, "must be valid.")
      end
    end
  end
end
