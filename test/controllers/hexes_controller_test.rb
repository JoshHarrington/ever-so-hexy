require "test_helper"

class HexesControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get hexes_home_url
    assert_response :success
  end
end
