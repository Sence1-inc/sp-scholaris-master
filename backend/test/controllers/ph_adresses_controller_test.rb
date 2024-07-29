require "test_helper"

class PhAdressesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @ph_adress = ph_adresses(:one)
  end

  test "should get index" do
    get ph_adresses_url
    assert_response :success
  end

  test "should get new" do
    get new_ph_adress_url
    assert_response :success
  end

  test "should create ph_adress" do
    assert_difference("PhAdress.count") do
      post ph_adresses_url, params: { ph_adress: {  } }
    end

    assert_redirected_to ph_adress_url(PhAdress.last)
  end

  test "should show ph_adress" do
    get ph_adress_url(@ph_adress)
    assert_response :success
  end

  test "should get edit" do
    get edit_ph_adress_url(@ph_adress)
    assert_response :success
  end

  test "should update ph_adress" do
    patch ph_adress_url(@ph_adress), params: { ph_adress: {  } }
    assert_redirected_to ph_adress_url(@ph_adress)
  end

  test "should destroy ph_adress" do
    assert_difference("PhAdress.count", -1) do
      delete ph_adress_url(@ph_adress)
    end

    assert_redirected_to ph_adresses_url
  end
end
