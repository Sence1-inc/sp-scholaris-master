require "test_helper"

class ScholarshipProvidersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @scholarship_provider = scholarship_providers(:one)
  end

  test "should get index" do
    get scholarship_providers_url
    assert_response :success
  end

  test "should get new" do
    get new_scholarship_provider_url
    assert_response :success
  end

  test "should create scholarship_provider" do
    assert_difference("ScholarshipProvider.count") do
      post scholarship_providers_url, params: { scholarship_provider: { provider_name: @scholarship_provider.provider_name, user_id: @scholarship_provider.user_id } }
    end

    assert_redirected_to scholarship_provider_url(ScholarshipProvider.last)
  end

  test "should show scholarship_provider" do
    get scholarship_provider_url(@scholarship_provider)
    assert_response :success
  end

  test "should get edit" do
    get edit_scholarship_provider_url(@scholarship_provider)
    assert_response :success
  end

  test "should update scholarship_provider" do
    patch scholarship_provider_url(@scholarship_provider), params: { scholarship_provider: { provider_name: @scholarship_provider.provider_name, user_id: @scholarship_provider.user_id } }
    assert_redirected_to scholarship_provider_url(@scholarship_provider)
  end

  test "should destroy scholarship_provider" do
    assert_difference("ScholarshipProvider.count", -1) do
      delete scholarship_provider_url(@scholarship_provider)
    end

    assert_redirected_to scholarship_providers_url
  end
end
