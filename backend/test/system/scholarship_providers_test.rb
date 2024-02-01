require "application_system_test_case"

class ScholarshipProvidersTest < ApplicationSystemTestCase
  setup do
    @scholarship_provider = scholarship_providers(:one)
  end

  test "visiting the index" do
    visit scholarship_providers_url
    assert_selector "h1", text: "Scholarship providers"
  end

  test "should create scholarship provider" do
    visit scholarship_providers_url
    click_on "New scholarship provider"

    fill_in "Provider name", with: @scholarship_provider.provider_name
    fill_in "User", with: @scholarship_provider.user_id
    click_on "Create Scholarship provider"

    assert_text "Scholarship provider was successfully created"
    click_on "Back"
  end

  test "should update Scholarship provider" do
    visit scholarship_provider_url(@scholarship_provider)
    click_on "Edit this scholarship provider", match: :first

    fill_in "Provider name", with: @scholarship_provider.provider_name
    fill_in "User", with: @scholarship_provider.user_id
    click_on "Update Scholarship provider"

    assert_text "Scholarship provider was successfully updated"
    click_on "Back"
  end

  test "should destroy Scholarship provider" do
    visit scholarship_provider_url(@scholarship_provider)
    click_on "Destroy this scholarship provider", match: :first

    assert_text "Scholarship provider was successfully destroyed"
  end
end
