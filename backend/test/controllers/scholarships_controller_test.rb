require "test_helper"

class ScholarshipsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @scholarship = scholarships(:one)
  end

  test "should get index" do
    get scholarships_url
    assert_response :success
  end

  test "should get new" do
    get new_scholarship_url
    assert_response :success
  end

  test "should create scholarship" do
    assert_difference("Scholarship.count") do
      post scholarships_url, params: { scholarship: { application_link: @scholarship.application_link, due_date: @scholarship.due_date, eligibility_id: @scholarship.eligibility_id, requirement_id: @scholarship.requirement_id, scholarship_name: @scholarship.scholarship_name, scholarship_provider_id: @scholarship.scholarship_provider_id, scholarship_type_id: @scholarship.scholarship_type_id, school_year: @scholarship.school_year, start_date: @scholarship.start_date } }
    end

    assert_redirected_to scholarship_url(Scholarship.last)
  end

  test "should show scholarship" do
    get scholarship_url(@scholarship)
    assert_response :success
  end

  test "should get edit" do
    get edit_scholarship_url(@scholarship)
    assert_response :success
  end

  test "should update scholarship" do
    patch scholarship_url(@scholarship), params: { scholarship: { application_link: @scholarship.application_link, due_date: @scholarship.due_date, eligibility_id: @scholarship.eligibility_id, requirement_id: @scholarship.requirement_id, scholarship_name: @scholarship.scholarship_name, scholarship_provider_id: @scholarship.scholarship_provider_id, scholarship_type_id: @scholarship.scholarship_type_id, school_year: @scholarship.school_year, start_date: @scholarship.start_date } }
    assert_redirected_to scholarship_url(@scholarship)
  end

  test "should destroy scholarship" do
    assert_difference("Scholarship.count", -1) do
      delete scholarship_url(@scholarship)
    end

    assert_redirected_to scholarships_url
  end
end
