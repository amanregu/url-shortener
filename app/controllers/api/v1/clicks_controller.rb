class Api::V1::ClicksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :fetch_clicks, only: [:create, :index]

  def index
    clicks_with_date = fetch_clicks.group_by { |click| click.created_at.strftime("%B %Y") }
    clicks_with_url_id = fetch_clicks.group_by { |click| click.url_id }
    render status: :ok, json: { clicks_with_date: clicks_with_date, clicks_with_url_id: clicks_with_url_id }
  end

  def create
    @click = Click.new(url_id: click_params[:url_id])

    if @click.save
      render status: :ok, json: { click: @clicks }
    else
      render status: :unprocessable_entity, json: { errors: @url.errors.full_messages }
    end
  end

  private

  def click_params
    params.require(:click).permit(:url_id)
  end

  def fetch_clicks
    @clicks = Click.all
  end
end
