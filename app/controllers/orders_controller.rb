class OrdersController < ApplicationController
  before_action :set_order, only: [:show, :edit, :update, :destroy]
  # GET /offers
  def index
    @orders = Order.all
    render :index, locals: { orders: @orders }
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_order
    @order = Order.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def order_params
    params.require(:order).permit(:order_date, :status, :total, :location, :supermarket_id, order_details_attributes: [:id, :product_id, :order_id, :quantity, :sub_total, :available])
  end
end
