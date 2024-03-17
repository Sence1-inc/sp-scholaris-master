class ScholarshipService
  attr_reader :scholarship_params, :benefits, :requirements, :eligibilities

  def initialize(params)
    @scholarship_params = params
    @benefits = params[:benefits] || []
    @requirements = params[:requirements] || []
    @eligibilities = params[:eligibilities] || []
  end

  def create_scholarship
    requirements_text = scholarship_params.delete(:requirements)
    eligibility_text = scholarship_params.delete(:eligibilities)
    benefit_name = scholarship_params.delete(:benefits)

    @requirements = Requirement.new(requirements_text: requirements_text)
    @eligibilities = Eligibility.new(eligibility_text: eligibility_text)
    @benefits = Benefit.new(benefit_name: benefit_name)

    @scholarship = Scholarship.new(scholarship_params)
    
    @scholarship.requirements << @requirements
    @scholarship.eligibilities << @eligibilities
    @scholarship.benefits << @benefits
    
    if @scholarship.save
      { message: 'Scholarship was successfully created.' }
    else
      { errors: @scholarship.errors.full_messages }
    end
  end
end
