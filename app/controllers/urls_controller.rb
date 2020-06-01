class UrlsController < ApplicationController
skip_before_action :verify_authenticity_token

  def index
    @urls = Url.order(is_pinned: :desc, updated_at: :desc)
    @categories = Category.order(updated_at: :desc)
  end

  def update
    @url = Url.find_by_slug!(params[:slug])

      if @url
        if @url.update(url_params)
          render status: :ok, json: { urls: fetch_urls }
        else
        render status: :unprocessable_entity, json: { errors: @url.errors.full_messages }
        end
      else
        render status: :not_found, json: { errors: @url.errors.full_messages }
      end
  end

  def create
    @url = Url.find_by_original!(params[:original])

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

  def show
    @url = Url.find_by_slug!(params[:slug])

    if @url
      render status: :ok, json: { original: @url.original }
    else
      render status: :not_found, json: { errors: "Not found" }
    end
  end

  private
    def url_params
      params.require(:url).permit(:original, :is_pinned, :category_id)
    end

    def fetch_urls
      @urls = Url.order(is_pinned: :desc, updated_at: :desc)
    end
end
