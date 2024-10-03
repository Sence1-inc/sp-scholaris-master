require "application_system_test_case"

class UserPermissionsTest < ApplicationSystemTestCase
  setup do
    @user_permission = user_permissions(:one)
  end

  test "visiting the index" do
    visit user_permissions_url
    assert_selector "h1", text: "User permissions"
  end

  test "should create user permission" do
    visit user_permissions_url
    click_on "New user permission"

    check "Can add" if @user_permission.can_add
    check "Can delete" if @user_permission.can_delete
    check "Can edit" if @user_permission.can_edit
    check "Can view" if @user_permission.can_view
    check "Is enabled" if @user_permission.is_enabled
    fill_in "User", with: @user_permission.user_id
    fill_in "User type", with: @user_permission.user_type
    click_on "Create User permission"

    assert_text "User permission was successfully created"
    click_on "Back"
  end

  test "should update User permission" do
    visit user_permission_url(@user_permission)
    click_on "Edit this user permission", match: :first

    check "Can add" if @user_permission.can_add
    check "Can delete" if @user_permission.can_delete
    check "Can edit" if @user_permission.can_edit
    check "Can view" if @user_permission.can_view
    check "Is enabled" if @user_permission.is_enabled
    fill_in "User", with: @user_permission.user_id
    fill_in "User type", with: @user_permission.user_type
    click_on "Update User permission"

    assert_text "User permission was successfully updated"
    click_on "Back"
  end

  test "should destroy User permission" do
    visit user_permission_url(@user_permission)
    click_on "Destroy this user permission", match: :first

    assert_text "User permission was successfully destroyed"
  end
end
