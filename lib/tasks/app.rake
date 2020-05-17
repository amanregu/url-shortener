namespace :app do
  session = ActionDispatch::Integration::Session.new(Rails.application)

  desc "generate encoded url"
  task encode: :environment do
    session.post "https://localhost:3000/create", params: { "url": { original: ENV['URL']  }}
    response = JSON.parse(session.response.body)
    status_code = session.response.status

    if status_code == 200
      puts "The shortened url of #{ENV['URL']} is https://short.is/#{response["slug"]}."
    else
      puts response["errors"]
    end
  end

  desc "generate decoded url"
    task decode: :environment do
      slug = ENV['SHORTURL'].last(8)
      session.get "https://localhost:3000/show", params: { "url": { slug: slug }}
      response = JSON.parse(session.response.body)
      status_code = session.response.status

      if status_code == 200
        puts "The original url for the short url #{ENV['SHORTURL']} is #{response["original"]}"
      elsif status_code == 404
        puts "No original url was found for the  short url #{ENV['SHORTURL']}"
      end
    end
end
