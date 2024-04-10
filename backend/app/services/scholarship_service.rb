class ScholarshipService
  attr_reader :scholarship_params

  def initialize(scholarship_params)
    @scholarship_params = scholarship_params
  end

  def create_scholarship
    requirements_text = @scholarship_params.delete("requirements")
    eligibility_text = @scholarship_params.delete("eligibilities")
    benefit_name = @scholarship_params.delete("benefits")

    @requirements = Requirement.new(requirements_text: requirements_text)
    @eligibilities = Eligibility.new(eligibility_text: eligibility_text)
    @benefits = Benefit.new(benefit_name: benefit_name)

    @scholarship = Scholarship.new(scholarship_params)
    
    @scholarship.requirements << @requirements
    @scholarship.eligibilities << @eligibilities
    @scholarship.benefits << @benefits
     
    if @scholarship.save
      @requirements.save
      @eligibilities.save
      @benefits.save
      { message: 'Scholarship was successfully created.' }
    else
      { errors: @scholarship.errors.full_messages }
    end
  end

  def update_scholarship(id)
    scholarship = Scholarship.find(id)
    update_associated_text(id, :requirements, Requirement)
    update_associated_text(id, :benefits, Benefit)
    update_associated_text(id, :eligibilities, Eligibility)
    if scholarship.update(@scholarship_params)
      { message: 'Scholarship details successfully updated.', scholarship: scholarship }
    else
      { errors: scholarship.errors.full_messages }
    end
  end

  private

  def update_associated_text(id, association, klass)
    scholarship = Scholarship.find(id)
    text = @scholarship_params.delete(association)
    return unless text.present?

    association_record = scholarship.send(association).first_or_initialize
    attribute_name = case association
                    when :requirements
                      :requirements_text
                    when :eligibilities
                      :eligibility_text
                    else
                      :benefit_name
                    end
    association_record.update(attribute_name => text)
    scholarship.add_association_record(association, association_record)
  end
end
