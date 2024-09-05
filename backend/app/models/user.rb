class User < ApplicationRecord
  belongs_to :role
  has_one :scholarship_provider
  has_one :student_profile

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email_address, presence: true
  validate :birthdate_is_valid

  default_scope -> { where(deleted_at: nil) }

  def as_json(options = {})
    super(options.merge(include: [:role, :student_profile, :scholarship_provider], except: [:created_at, :updated_at, :deleted_at, :password]))
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
    else
      errors.add(:birthdate, "can't be blank.")
    end
  end
end
