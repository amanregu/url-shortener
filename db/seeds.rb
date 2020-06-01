urls = [
  "eepurl.com",
  "shareasale.com",
  "https://github.com/",
  "https://altcampus.io",
  "https://linkedin.com",
  "https://webnode.com",
  "https://reddit.com",
  "https://slack.com",
  "https://zoom.com",
  "https://webs.com"
]

if !Url.any?

  urls.each do |url|
    @url = Url.new(original: url)
    @url.generate_slug
    @url.save
  end
end
