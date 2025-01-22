require "test_helper"

class Api::V1::BookmarksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @api_v1_bookmark = api_v1_bookmarks(:one)
  end

  test "should get index" do
    get api_v1_bookmarks_url
    assert_response :success
  end

  test "should get new" do
    get new_api_v1_bookmark_url
    assert_response :success
  end

  test "should create api_v1_bookmark" do
    assert_difference("Api::V1::Bookmark.count") do
      post api_v1_bookmarks_url, params: { api_v1_bookmark: {  } }
    end

    assert_redirected_to api_v1_bookmark_url(Api::V1::Bookmark.last)
  end

  test "should show api_v1_bookmark" do
    get api_v1_bookmark_url(@api_v1_bookmark)
    assert_response :success
  end

  test "should get edit" do
    get edit_api_v1_bookmark_url(@api_v1_bookmark)
    assert_response :success
  end

  test "should update api_v1_bookmark" do
    patch api_v1_bookmark_url(@api_v1_bookmark), params: { api_v1_bookmark: {  } }
    assert_redirected_to api_v1_bookmark_url(@api_v1_bookmark)
  end

  test "should destroy api_v1_bookmark" do
    assert_difference("Api::V1::Bookmark.count", -1) do
      delete api_v1_bookmark_url(@api_v1_bookmark)
    end

    assert_redirected_to api_v1_bookmarks_url
  end
end
