require "application_system_test_case"

class Api::V1::BookmarksTest < ApplicationSystemTestCase
  setup do
    @api_v1_bookmark = api_v1_bookmarks(:one)
  end

  test "visiting the index" do
    visit api_v1_bookmarks_url
    assert_selector "h1", text: "Bookmarks"
  end

  test "should create bookmark" do
    visit api_v1_bookmarks_url
    click_on "New bookmark"

    click_on "Create Bookmark"

    assert_text "Bookmark was successfully created"
    click_on "Back"
  end

  test "should update Bookmark" do
    visit api_v1_bookmark_url(@api_v1_bookmark)
    click_on "Edit this bookmark", match: :first

    click_on "Update Bookmark"

    assert_text "Bookmark was successfully updated"
    click_on "Back"
  end

  test "should destroy Bookmark" do
    visit api_v1_bookmark_url(@api_v1_bookmark)
    click_on "Destroy this bookmark", match: :first

    assert_text "Bookmark was successfully destroyed"
  end
end
