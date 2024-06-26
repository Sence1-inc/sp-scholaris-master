require "application_system_test_case"

class PhAdressesTest < ApplicationSystemTestCase
  setup do
    @ph_adress = ph_adresses(:one)
  end

  test "visiting the index" do
    visit ph_adresses_url
    assert_selector "h1", text: "Ph adresses"
  end

  test "should create ph adress" do
    visit ph_adresses_url
    click_on "New ph adress"

    click_on "Create Ph adress"

    assert_text "Ph adress was successfully created"
    click_on "Back"
  end

  test "should update Ph adress" do
    visit ph_adress_url(@ph_adress)
    click_on "Edit this ph adress", match: :first

    click_on "Update Ph adress"

    assert_text "Ph adress was successfully updated"
    click_on "Back"
  end

  test "should destroy Ph adress" do
    visit ph_adress_url(@ph_adress)
    click_on "Destroy this ph adress", match: :first

    assert_text "Ph adress was successfully destroyed"
  end
end
