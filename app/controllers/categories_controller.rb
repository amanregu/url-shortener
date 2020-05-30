class CategoriesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_category, only: [:show, :edit, :update, :destroy]
  before_action :fetch_categories, only: [:create, :update, :destroy]

  # GET /categories
  # GET /categories.json
  def index
    @categories = Category.order(created_at: :desc)
  end

  # GET /categories/1
  # GET /categories/1.json
  def show
  end

  # GET /categories/new
  def new
    @category = Category.new
  end

  # GET /categories/1/edit
  def edit
  end

  # POST /categories
  # POST /categories.json
  def create
    @category = Category.new(category_params)

      if @category.save
        render status: :created, json: { categories: @categories }
      else
        render status: :unprocessable_entity, json: { errors: @category.errors.full_message }
      end
  end

  # PATCH/PUT /categories/1
  # PATCH/PUT /categories/1.json
  def update
      if @category.update(category_params)
        render :show, status: :ok, json: { categories: @categories }
      else
        render status: :unprocessable_entity, json: { errors: @category.errors.full_message }
      end
  end

  # DELETE /categories/1
  # DELETE /categories/1.json
  def destroy
    if @category.destroy
      render status: :ok, json: { categories: @categories }
    else
      render status: :unprocessable_entity, json: { errors: @category.errors.full_message }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_category
      @category = Category.find(params[:id])
    end

    def fetch_categories
      @categories = Category.order(created_at: :desc)
    end

    # Only allow a list of trusted parameters through.
    def category_params
      params.require(:category).permit(:title)
    end
end
