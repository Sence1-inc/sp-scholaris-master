require "test_helper"

class ScholarshipFeedbacksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @scholarship_feedback = scholarship_feedbacks(:one)
  end

  test "should get index" do
    get scholarship_feedbacks_url
    assert_response :success
  end

  test "should get new" do
    get new_scholarship_feedback_url
    assert_response :success
  end

  test "should create scholarship_feedback" do
    assert_difference("ScholarshipFeedback.count") do
      post scholarship_feedbacks_url, params: { scholarship_feedback: { created_by_id: @scholarship_feedback.created_by_id, feedback: @scholarship_feedback.feedback, scholarship_provider_id: @scholarship_feedback.scholarship_provider_id } }
    end

    assert_redirected_to scholarship_feedback_url(ScholarshipFeedback.last)
  end

  test "should show scholarship_feedback" do
    get scholarship_feedback_url(@scholarship_feedback)
    assert_response :success
  end

  test "should get edit" do
    get edit_scholarship_feedback_url(@scholarship_feedback)
    assert_response :success
  end

  test "should update scholarship_feedback" do
    patch scholarship_feedback_url(@scholarship_feedback), params: { scholarship_feedback: { created_by_id: @scholarship_feedback.created_by_id, feedback: @scholarship_feedback.feedback, scholarship_provider_id: @scholarship_feedback.scholarship_provider_id } }
    assert_redirected_to scholarship_feedback_url(@scholarship_feedback)
  end

  test "should destroy scholarship_feedback" do
    assert_difference("ScholarshipFeedback.count", -1) do
      delete scholarship_feedback_url(@scholarship_feedback)
    end

    assert_redirected_to scholarship_feedbacks_url
  end
end
