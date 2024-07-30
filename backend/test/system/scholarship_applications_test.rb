require "application_system_test_case"

class ScholarshipApplicationsTest < ApplicationSystemTestCase
  setup do
    @scholarship_application = scholarship_applications(:one)
  end

  test "visiting the index" do
    visit scholarship_applications_url
    assert_selector "h1", text: "Scholarship applications"
  end

  test "should create scholarship application" do
    visit scholarship_applications_url
    click_on "New scholarship application"

    fill_in "Recipient email", with: @scholarship_application.recipient_email
    fill_in "User message", with: @scholarship_application.user_message
    click_on "Create Scholarship application"

    assert_text "Scholarship application was successfully created"
    click_on "Back"
  end

  test "should update Scholarship application" do
    visit scholarship_application_url(@scholarship_application)
    click_on "Edit this scholarship application", match: :first

    fill_in "Recipient email", with: @scholarship_application.recipient_email
    fill_in "User message", with: @scholarship_application.user_message
    click_on "Update Scholarship application"

    assert_text "Scholarship application was successfully updated"
    click_on "Back"
  end

  test "should destroy Scholarship application" do
    visit scholarship_application_url(@scholarship_application)
    click_on "Destroy this scholarship application", match: :first

    assert_text "Scholarship application was successfully destroyed"
  end
end
