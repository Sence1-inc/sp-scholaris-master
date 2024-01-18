require "application_system_test_case"

class ScholarshipsTest < ApplicationSystemTestCase
  setup do
    @scholarship = scholarships(:one)
  end

  test "visiting the index" do
    visit scholarships_url
    assert_selector "h1", text: "Scholarships"
  end

  test "should create scholarship" do
    visit scholarships_url
    click_on "New scholarship"

    fill_in "Application link", with: @scholarship.application_link
    fill_in "Due date", with: @scholarship.due_date
    fill_in "Eligibility", with: @scholarship.eligibility_id
    fill_in "Requirement", with: @scholarship.requirement_id
    fill_in "Scholarship name", with: @scholarship.scholarship_name
    fill_in "Scholarship provider", with: @scholarship.scholarship_provider_id
    fill_in "Scholarship type", with: @scholarship.scholarship_type_id
    fill_in "School year", with: @scholarship.school_year
    fill_in "Start date", with: @scholarship.start_date
    click_on "Create Scholarship"

    assert_text "Scholarship was successfully created"
    click_on "Back"
  end

  test "should update Scholarship" do
    visit scholarship_url(@scholarship)
    click_on "Edit this scholarship", match: :first

    fill_in "Application link", with: @scholarship.application_link
    fill_in "Due date", with: @scholarship.due_date
    fill_in "Eligibility", with: @scholarship.eligibility_id
    fill_in "Requirement", with: @scholarship.requirement_id
    fill_in "Scholarship name", with: @scholarship.scholarship_name
    fill_in "Scholarship provider", with: @scholarship.scholarship_provider_id
    fill_in "Scholarship type", with: @scholarship.scholarship_type_id
    fill_in "School year", with: @scholarship.school_year
    fill_in "Start date", with: @scholarship.start_date
    click_on "Update Scholarship"

    assert_text "Scholarship was successfully updated"
    click_on "Back"
  end

  test "should destroy Scholarship" do
    visit scholarship_url(@scholarship)
    click_on "Destroy this scholarship", match: :first

    assert_text "Scholarship was successfully destroyed"
  end
end
