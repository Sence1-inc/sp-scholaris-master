require "application_system_test_case"

class ScholarshipFeedbacksTest < ApplicationSystemTestCase
  setup do
    @scholarship_feedback = scholarship_feedbacks(:one)
  end

  test "visiting the index" do
    visit scholarship_feedbacks_url
    assert_selector "h1", text: "Scholarship feedbacks"
  end

  test "should create scholarship feedback" do
    visit scholarship_feedbacks_url
    click_on "New scholarship feedback"

    fill_in "Created by", with: @scholarship_feedback.created_by_id
    fill_in "Feedback", with: @scholarship_feedback.feedback
    fill_in "Scholarship provider", with: @scholarship_feedback.scholarship_provider_id
    click_on "Create Scholarship feedback"

    assert_text "Scholarship feedback was successfully created"
    click_on "Back"
  end

  test "should update Scholarship feedback" do
    visit scholarship_feedback_url(@scholarship_feedback)
    click_on "Edit this scholarship feedback", match: :first

    fill_in "Created by", with: @scholarship_feedback.created_by_id
    fill_in "Feedback", with: @scholarship_feedback.feedback
    fill_in "Scholarship provider", with: @scholarship_feedback.scholarship_provider_id
    click_on "Update Scholarship feedback"

    assert_text "Scholarship feedback was successfully updated"
    click_on "Back"
  end

  test "should destroy Scholarship feedback" do
    visit scholarship_feedback_url(@scholarship_feedback)
    click_on "Destroy this scholarship feedback", match: :first

    assert_text "Scholarship feedback was successfully destroyed"
  end
end
