class UrlsController < ApplicationController
skip_before_action :verify_authenticity_token


  def index
  end
  

  def encode
    @url = Url.find_by(url_params)

    if @url 
      render status: :ok, json: { slug: @url.slug }
    else
      @url = Url.new(url_params)
      @url.generate_slug

      if @url.save
        render status: 	:created, json: { slug: @url.slug }
      else
        render status: :unprocessable_entity, json: { errors: @url.errors.full_messages }
      end

    end
  end

  def decode
    @url = Url.find_by(url_params)

    if @url
      render status: :ok, json: { original: @url.original }
    else
      render status: :not_found, json: { errors: "Not found" }
    end
  end


  private
    def url_params
      params.require(:url).permit(:original, :slug)
    end
end
