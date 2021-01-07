class SupermarketsController < ApplicationController
  before_action :set_supermarket, only: [:show, :edit, :update, :destroy]
  # GET /supermarkets
  def index
    @supermarkets = Supermarket.all
  end

  # GET /supermarkets/1
  def show
  end

  # GET /supermarkets/new
  def new
    @supermarket = Supermarket.new
  end

  # GET /supermarkets/1/edit
  def edit
  end

  # POST /supermarkets
  def create
    @supermarket = Supermarket.new(supermarket_params)

    respond_to do |format|
      if @supermarket.save
        format.html { redirect_to @supermarket, notice: 'Supermarket was successfully created.' }
        format.json { render :show, status: :created, location: @supermarket }
      else
        format.html { render :new }
        format.json { render json: @supermarket.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /supermarkets/1
  def update
    respond_to do |format|
      if @supermarket.update(client_params)
        format.html { redirect_to @supermarket, notice: 'Supermarket was successfully updated.' }
        format.json { render :show, status: :ok, location: @supermarket }
      else
        format.html { render :edit }
        format.json { render json: @supermarket.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /supermarkets/1
  def destroy
    @supermarket.destroy
    respond_to do |format|
      format.html { redirect_to clients_url, notice: 'Supermarket was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_supermarket
    @supermarket = Supermarket.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def supermarket_params
    params.require(:supermarket).permit(:name, :direction)
  end
end
