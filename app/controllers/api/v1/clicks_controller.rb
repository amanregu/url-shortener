class Api::V1::ClicksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :fetch_clicks, only: :index

  def index
    clicks_with_date = @clicks.group_by { |click| click.created_at.strftime("%B %Y") }
    render status: :ok, json: { clicks_with_date: clicks_with_date, clicks_with_url_id: @clicks_with_url_id }
  end

  def create
    @click = Click.new(url_id: click_params[:url_id])

    if @click.save
      fetch_clicks()
      render status: :ok, json: { clicks_with_url_id: @clicks_with_url_id }
    else
      render status: :unprocessable_entity, json: { errors: @url.errors.full_messages }
    end
  end

  private

  def click_params
    params.require(:click).permit(:url_id)
  end

  def fetch_clicks
    @clicks = Click.order(created_at: :desc)
    @clicks_with_url_id = @clicks.group_by { |click| click.url_id }
  end
end
