require "test_helper"

class Api::V1::SurveyQuestionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @api_v1_survey_question = api_v1_survey_questions(:one)
  end

  test "should get index" do
    get api_v1_survey_questions_url
    assert_response :success
  end

  test "should get new" do
    get new_api_v1_survey_question_url
    assert_response :success
  end

  test "should create api_v1_survey_question" do
    assert_difference("Api::V1::SurveyQuestion.count") do
      post api_v1_survey_questions_url, params: { api_v1_survey_question: {  } }
    end

    assert_redirected_to api_v1_survey_question_url(Api::V1::SurveyQuestion.last)
  end

  test "should show api_v1_survey_question" do
    get api_v1_survey_question_url(@api_v1_survey_question)
    assert_response :success
  end

  test "should get edit" do
    get edit_api_v1_survey_question_url(@api_v1_survey_question)
    assert_response :success
  end

  test "should update api_v1_survey_question" do
    patch api_v1_survey_question_url(@api_v1_survey_question), params: { api_v1_survey_question: {  } }
    assert_redirected_to api_v1_survey_question_url(@api_v1_survey_question)
  end

  test "should destroy api_v1_survey_question" do
    assert_difference("Api::V1::SurveyQuestion.count", -1) do
      delete api_v1_survey_question_url(@api_v1_survey_question)
    end

    assert_redirected_to api_v1_survey_questions_url
  end
end
