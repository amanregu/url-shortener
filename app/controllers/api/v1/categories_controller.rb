class Api::V1::CategoriesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_category, only: [:show, :edit, :update, :destroy]
  before_action :fetch_categories, only: [:create, :update, :destroy]

  def index
    @categories = Category.order(created_at: :desc)
    render status: :ok, json: { categories: @categories }
  end

  def new
    @category = Category.new
  end

  def create
    @category = Category.new(category_params)

    if @category.save
      render status: :created, json: { categories: @categories }
    else
      render status: :unprocessable_entity, json: { errors: @category.errors.full_message }
    end
  end

  def update
      if @category.update(category_params)
        render :show, status: :ok, json: { categories: @categories }
      else
        render status: :unprocessable_entity, json: { errors: @category.errors.full_message }
      end
  end

  def destroy
    if @category.destroy
      render status: :ok, json: { categories: @categories }
    else
      render status: :unprocessable_entity, json: { errors: @category.errors.full_message }
    end
  end

  private

    def set_category
      @category = Category.find(params[:id])
    end

    def fetch_categories
      @categories = Category.order(created_at: :desc)
    end

    def category_params
      params.require(:category).permit(:title)
    end
end
