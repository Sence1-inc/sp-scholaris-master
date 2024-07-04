benefit_categories = [
  { id: 1, category_name: "Book Allowance" },
  { id: 2, category_name: "Accommodation Allowance" },
  { id: 3, category_name: "Travel Allowance" },
  { id: 4, category_name: "Living Stipend" },
  { id: 5, category_name: "Research Grant" },
  { id: 6, category_name: "Study Abroad Support" },
  { id: 7, category_name: "Internship Support" },
  { id: 8, category_name: "Health Insurance" },
  { id: 9, category_name: "Professional Development Allowance" },
  { id: 10, category_name: "Technology Grant" },
  { id: 11, category_name: "Childcare Support" },
  { id: 12, category_name: "Mentorship and Counseling Services" },
  { id: 13, category_name: "Special Needs Accommodation" },
  { id: 14, category_name: "Graduation Support" },
  { id: 15, category_name: "Partial Scholarship" },
  { id: 16, category_name: "Full Scholarship" },
  { id: 17, category_name: "Stipend" }
];

benefit_categories.each do |category|
  id = category[:id]
  existing_benefit_category = BenefitCategory.find_by(id: id)
  
  if existing_benefit_category.nil?
    BenefitCategory.create!(id: id, category_name: category[:category_name])
  else
    puts "Skipping benefit category with id #{id} because it already exists."
  end
end
