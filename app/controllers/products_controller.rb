class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy]
  # GET /products
  def index
    if params[:filterrific].present?
      supermarket_id = params[:filterrific][:supermarket_id]
      last_checked = params[:filterrific][:with_category]
    else
      supermarket_id = params[:supermarket_id]
    end
    supermarket = Supermarket.find(supermarket_id)
    last_checked ||= params[:last_checked].present? ? params[:last_checked] : []
    @filterrific = initialize_filterrific(
      Product,
      params[:filterrific],
      default_filter_params: {},
      available_filters: [:search_query, :with_category],
      sanitize_params: true
    ) || nil

    @products = @filterrific.find.page(params[:page])

    render :index, locals: {supermarket: supermarket, last_checked: last_checked}
  end

  # GET /products/1
  def show
  end

  # GET /products/new
  def new
    @product = Product.new
  end

  # GET /products/1/edit
  def edit
  end

  def cart
    # si ya hay un id del carrito se busca en la BD
    if session[:cart_id]
      @cart = Cart.find(session[:cart_id])
    else
      # si no se crea y se asigna ese ID a la sesion de la APP
      @cart = Cart.create
      session[:cart_id] = @cart.id
    end
    respond_to do |format|
      format.js
    end
  end

  def filter
    (@filterrific = initialize_filterrific(
      Product,
      params[:filterrific],
      default_filter_params: {},
      select_options: {
        with_category: Product.product_category.options
      },
      )) || return
    @products = @filterrific.find.page(params[:page])
    if params[:supermarket_id]
      supermarket = Supermarket.find(params[:supermarket_id])
    end
    last_checked = params[:last_checked].present? ? params[:last_checked] : []
    if params[:filterrific]
      last_checked = params[:filterrific][:with_category]
      params[:last_checked] = last_checked
      params[:supermarket_id] ||= params[:filterrific][:supermarket_id]
      params[:products] ||= @products
      return index
    else
      render :filter, locals: {filterrific: @filterrific, supermarket: supermarket, last_checked: last_checked}
    end

  end

  # POST /products
  def create
    @product = Product.new(product_params)

    respond_to do |format|
      if @product.save
        format.html { redirect_to @product, notice: 'Product was successfully created.' }
        format.json { render :show, status: :created, location: @product }
      else
        format.html { render :new }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /products/1
  def update
    respond_to do |format|
      if @product.update(product_params)
        format.html { redirect_to @product, notice: 'Product was successfully updated.' }
        format.json { render :show, status: :ok, location: @product }
      else
        format.html { render :edit }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /products/1
  def destroy
    @product.destroy
    respond_to do |format|
      format.html { redirect_to products_url, notice: 'Product was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_product
    @product = Product.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def product_params
    params.require(:product).permit(:description, :price, :category)
  end
end
