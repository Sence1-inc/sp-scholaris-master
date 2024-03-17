class ScholarshipService
  attr_reader :scholarship_params, :benefits, :requirements, :eligibilities

  def initialize(params)
    @scholarship_params = params
    @benefits = params[:benefits] || []
    @requirements = params[:requirements] || []
    @eligibilities = params[:eligibilities] || []
  end

  def create_scholarship
    @scholarship = Scholarship.new(scholarship_params)
    if save_scholarship_and_associations
      { message: 'Scholarship was successfully created.' }
    else
      { errors: @scholarship.errors.full_messages }
    end
  end

  private

  def save_scholarship_and_associations
    ActiveRecord::Base.transaction do
      build_associations
      @scholarship.save
    end
  rescue ActiveRecord::RecordInvalid => e
    puts "Error saving scholarship: #{e.message}"
    false
  end

  def build_associations
    save_associations
  end

  def build_requirements
    @requirements = scholarship_params[:requirements]&.map do |_, param|
      Requirement.new(requirements_text: param[:requirements_text])
    end
  end

  def build_benefits
    @benefits = scholarship_params[:benefits_attributes]&.map do |_, param|
      Benefit.new(benefit_name: param[:benefit_name])
    end
  end

  def build_eligibilities
    @eligibilities = scholarship_params[:eligibilities_attributes]&.map do |_, param|
      Eligibility.new(eligibility_text: param[:eligibility_text])
    end
  end

  def save_associations
    @benefits.each { |benefit| @scholarship.benefits << benefit } if @benefits
    @requirements.each { |requirement| @scholarship.requirements << requirement } if @requirements
    @eligibilities.each { |eligibility| @scholarship.eligibilities << eligibility } if @eligibilities
  end
end
