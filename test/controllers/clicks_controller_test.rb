require 'test_helper'

class ClicksControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get clicks_index_url
    assert_response :success
  end
end
