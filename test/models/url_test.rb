require 'test_helper'

class UrlTest < ActiveSupport::TestCase
  fixtures :urls

  test "url should be present" do
    urls(:one).original = ""
    assert urls(:one).invalid?
  end

  test "url should be valid" do
    urls(:one).original = "wwwgooglecom"
    assert urls(:one).invalid?
  end

  test "url should be unique" do
    url = urls(:one)
    new_url = Url.new(original: url.original, slug: "AC67476F")
    assert new_url.invalid?
  end

  test "slug should have length of 8 characters" do
    urls(:one).original = "1234567"
    assert urls(:one).invalid?
  end

  test "slug should be unique" do
    url = urls(:one)
    new_url = Url.new(original: "https://youtube.com", slug: url.slug)
    assert new_url.invalid?
  end
end
