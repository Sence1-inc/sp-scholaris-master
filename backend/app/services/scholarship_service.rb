class ScholarshipService
  attr_reader :scholarship_params

  def initialize(scholarship_params)
    @scholarship_params = scholarship_params
  end

  def create_scholarship
    requirements_text = @scholarship_params.delete("requirements")
    eligibility_text = @scholarship_params.delete("eligibilities")
    benefit_name = @scholarship_params.delete("benefits")
    benefit_categories = @scholarship_params.delete("benefit_categories")

    @requirements = Requirement.new(requirements_text: requirements_text)
    @eligibilities = Eligibility.new(eligibility_text: eligibility_text)
    @benefits = Benefit.new(benefit_name: benefit_name)
    @benefit_categories = []

    benefit_categories.each do |category|
      benefit_category = BenefitCategory.find(category[:id])
      @benefit_categories << benefit_category if benefit_category
    end

    @scholarship = Scholarship.new(scholarship_params)
    
    @scholarship.requirements << @requirements
    @scholarship.eligibilities << @eligibilities
    @scholarship.benefits << @benefits
    @scholarship.benefit_categories << @benefit_categories
     
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
    update_associated_categories(id, :benefit_categories, BenefitCategory)
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
                    when :benefits
                      :benefit_name
                    end
    association_record.update(attribute_name => text)
    scholarship.add_association_record(association, association_record)
  end

  def update_associated_categories(id, association, klass)
    scholarship = Scholarship.find(id)
    categories = @scholarship_params.delete(association)
    return unless categories.present?

    categories.each do |category|
      category_id = category[:id]
      category_attributes = category.except(:id)

      category_record = klass.find_or_initialize_by(id: category_id)
      category_record.assign_attributes(category_attributes.permit(:category_name)) # Permit only allowed attributes

      scholarship.add_association_record(association, category_record)
    end
  end

end
