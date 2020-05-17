require 'test_helper'

class UrlsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get urls_create_url
    assert_response :success
  end

  test "should get show" do
    get urls_show_url
    assert_response :success
  end

end
