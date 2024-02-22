require "application_system_test_case"

class Api::V1::SurveyQuestionsTest < ApplicationSystemTestCase
  setup do
    @api_v1_survey_question = api_v1_survey_questions(:one)
  end

  test "visiting the index" do
    visit api_v1_survey_questions_url
    assert_selector "h1", text: "Survey questions"
  end

  test "should create survey question" do
    visit api_v1_survey_questions_url
    click_on "New survey question"

    click_on "Create Survey question"

    assert_text "Survey question was successfully created"
    click_on "Back"
  end

  test "should update Survey question" do
    visit api_v1_survey_question_url(@api_v1_survey_question)
    click_on "Edit this survey question", match: :first

    click_on "Update Survey question"

    assert_text "Survey question was successfully updated"
    click_on "Back"
  end

  test "should destroy Survey question" do
    visit api_v1_survey_question_url(@api_v1_survey_question)
    click_on "Destroy this survey question", match: :first

    assert_text "Survey question was successfully destroyed"
  end
end
