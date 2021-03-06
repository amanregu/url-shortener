namespace :app do
  session = ActionDispatch::Integration::Session.new(Rails.application)

  desc "generate encoded url"
  task encode: :environment do
    session.post "https://localhost:3000/api/v1/urls", params: { "url": { original: ENV['URL'] } }
    response = JSON.parse(session.response.body)
    status_code = session.response.status

    if status_code == 200
      puts "The shortened url of #{ENV['URL']} is #{ENV['HOST_URL']}/#{response["slug"]}."
    else
      puts response["errors"]
    end
  end

  desc "generate decoded url"
  task decode: :environment do
    puts ENV['HOST_URL']
    slug = ENV['SHORTURL'].last(8)
    session.get "#{ENV['HOST_URL']}/api/v1/urls/#{slug}"
    response = JSON.parse(session.response.body)
    status_code = session.response.status

    if status_code == 200
      puts "The original url for the short url #{ENV['SHORTURL']} is #{response["original"]}"
    elsif status_code == 404
      puts "No original url was found for the  short url #{ENV['SHORTURL']}"
    end
  end
end
