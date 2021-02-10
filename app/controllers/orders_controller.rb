class OrdersController < ApplicationController
  before_action :set_order, only: [:show, :edit, :update, :destroy]
  # GET /offers
  def index
    @orders = Order.all.order(order_date: :desc)
    render :index, locals: { orders: @orders }
  end

  def new
    @order = Order.new
    id = params['supermarket_id']
    @order.supermarket_id = Integer(id)
  end

  def map
    respond_to do |format|
      format.js
    end
  end

  # POST /orders
  def create
    @order = Order.new(order_params)
    @orders = Order.all

    @order.order_date = Time.now
    @order.status = 'in_process'

    respond_to do |format|
      if @order.save
        format.html { render :index }
      else
        format.html { render :new }
      end
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_order
    @order = Order.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def order_params
    params.require(:order).permit(:user, :order_date, :status, :total, :location, :supermarket_id, :latitude, :longitude)
  end
end

#order_details_attributes: [:id, :product_id, :order_id, :quantity, :sub_total, :available]
