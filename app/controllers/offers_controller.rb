class OffersController < ApplicationController
  before_action :set_offer, only: [:show, :edit, :update, :destroy]
  # GET /offers
  def index
    @offers = Offer.all
    render :index, locals: { offers: @offers }
  end

  # GET /offers/1
  def show
  end

  # GET /offers/new
  def new
    @offer = Offer.new
    @offer_details = @offer.offer_details.build
  end

  # GET /offers/1/edit
  def edit
  end

  # POST /offers
  def create
    @offer = Offer.new(offer_params)

    respond_to do |format|
      if @offer.save
        format.html { redirect_to @offer, notice: 'Oferta creada exitosamente.' }
        format.json { render :show, status: :created, location: @offer }
      else
        format.html { render :new }
        format.json { render json: @offer.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /offers/1
  def update
    respond_to do |format|
      if @offer.update(offer_params)
        format.html { redirect_to @offer, notice: 'Oferta actualizada exitosamente.' }
        format.json { render :show, status: :ok, location: @offer }
      else
        format.html { render :edit }
        format.json { render json: @offer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /offers/1
  def destroy
    @offer.destroy
    respond_to do |format|
      format.html { redirect_to offers_url, notice: 'Oferta eliminada exitosamente.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_offer
    @offer = Offer.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def offer_params
    params.require(:offer).permit(:start_date, :end_date, :description, :discount, :supermarket_id, offer_details_attributes: [:id, :product_id, :offer_id])
  end
end
