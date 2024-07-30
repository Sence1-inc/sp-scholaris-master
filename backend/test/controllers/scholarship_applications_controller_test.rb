require "test_helper"

class ScholarshipApplicationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @scholarship_application = scholarship_applications(:one)
  end

  test "should get index" do
    get scholarship_applications_url
    assert_response :success
  end

  test "should get new" do
    get new_scholarship_application_url
    assert_response :success
  end

  test "should create scholarship_application" do
    assert_difference("ScholarshipApplication.count") do
      post scholarship_applications_url, params: { scholarship_application: { recipient_email: @scholarship_application.recipient_email, user_message: @scholarship_application.user_message } }
    end

    assert_redirected_to scholarship_application_url(ScholarshipApplication.last)
  end

  test "should show scholarship_application" do
    get scholarship_application_url(@scholarship_application)
    assert_response :success
  end

  test "should get edit" do
    get edit_scholarship_application_url(@scholarship_application)
    assert_response :success
  end

  test "should update scholarship_application" do
    patch scholarship_application_url(@scholarship_application), params: { scholarship_application: { recipient_email: @scholarship_application.recipient_email, user_message: @scholarship_application.user_message } }
    assert_redirected_to scholarship_application_url(@scholarship_application)
  end

  test "should destroy scholarship_application" do
    assert_difference("ScholarshipApplication.count", -1) do
      delete scholarship_application_url(@scholarship_application)
    end

    assert_redirected_to scholarship_applications_url
  end
end
