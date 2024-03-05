require "test_helper"

class ScholarshipTypesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @scholarship_type = scholarship_types(:one)
  end

  test "should get index" do
    get scholarship_types_url
    assert_response :success
  end

  test "should get new" do
    get new_scholarship_type_url
    assert_response :success
  end

  test "should create scholarship_type" do
    assert_difference("ScholarshipType.count") do
      post scholarship_types_url, params: { scholarship_type: { scholarship_type_name: @scholarship_type.scholarship_type_name } }
    end

    assert_redirected_to scholarship_type_url(ScholarshipType.last)
  end

  test "should show scholarship_type" do
    get scholarship_type_url(@scholarship_type)
    assert_response :success
  end

  test "should get edit" do
    get edit_scholarship_type_url(@scholarship_type)
    assert_response :success
  end

  test "should update scholarship_type" do
    patch scholarship_type_url(@scholarship_type), params: { scholarship_type: { scholarship_type_name: @scholarship_type.scholarship_type_name } }
    assert_redirected_to scholarship_type_url(@scholarship_type)
  end

  test "should destroy scholarship_type" do
    assert_difference("ScholarshipType.count", -1) do
      delete scholarship_type_url(@scholarship_type)
    end

    assert_redirected_to scholarship_types_url
  end
end
