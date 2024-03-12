require "application_system_test_case"

class ScholarshipTypesTest < ApplicationSystemTestCase
  setup do
    @scholarship_type = scholarship_types(:one)
  end

  test "visiting the index" do
    visit scholarship_types_url
    assert_selector "h1", text: "Scholarship types"
  end

  test "should create scholarship type" do
    visit scholarship_types_url
    click_on "New scholarship type"

    fill_in "Scholarship type name", with: @scholarship_type.scholarship_type_name
    click_on "Create Scholarship type"

    assert_text "Scholarship type was successfully created"
    click_on "Back"
  end

  test "should update Scholarship type" do
    visit scholarship_type_url(@scholarship_type)
    click_on "Edit this scholarship type", match: :first

    fill_in "Scholarship type name", with: @scholarship_type.scholarship_type_name
    click_on "Update Scholarship type"

    assert_text "Scholarship type was successfully updated"
    click_on "Back"
  end

  test "should destroy Scholarship type" do
    visit scholarship_type_url(@scholarship_type)
    click_on "Destroy this scholarship type", match: :first

    assert_text "Scholarship type was successfully destroyed"
  end
end
